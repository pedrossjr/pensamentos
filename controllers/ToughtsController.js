const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts( req, res) {
        
        let search = ''

        if(req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.iLike]: `%${search}%` },
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({ plain: true }))

        let toughtsQty = toughts.length

        if( toughtsQty === 0 ) {
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    static async dashboard(req, res) {

        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true,
        })

        if(!user) {
            res.redirect('/login')
        }

        const toughts = user.Toughts ? user.Toughts.map((result) => result.dataValues) : [];

         let emptyToughts = false

        if( toughts.length === 0 ) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        
        //TODO implementar a verificação do id do usuário

        if(!tought.UserId) {
            req.flash('message', 'Não foi identificado o usuário autor para a criação do pensamento.')
            res.render('toughts/dashboard')

            return
        }

        try{
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um error: ' + error)
            //TODO implementar o salvamento em um arquivo de log
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        console.log(id)
        console.log(UserId)

        try {
            await Tought.destroy({ where: { id: id, UserId: UserId } })

            req.flash('message', 'Pensamentos removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch {
            console.log('Aconteceu um error: ' + error)
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id

        const tought = await Tought.findOne({ where: {id: id}, raw: true })

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res) {

        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, { where: { id: id } })
            req.flash('message', 'Pensamentos atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu um error: ' + error)
        }
    }
}