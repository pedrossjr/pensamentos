const express = require('express') // variável importando o módulo externo 'express'

const router = express.Router() // variável rota apartir do express.

const ToughtController = require('../controllers/ToughtsController') // variável para importação do controller ToughtsController

const checkAuth = require('../helpers/auth').checkAuth // Importação de helpers genéricos

router.get('/add', checkAuth, ToughtController.createTought) // Rota para abertura do formulário de pensamento
router.post('/add', checkAuth, ToughtController.createToughtSave) // Rota post criando um pensamento
router.get('/edit/:id', checkAuth, ToughtController.updateTought) // Rota para abrir formulário de edição de pensamento.
router.post('/edit', checkAuth, ToughtController.updateToughtSave) // Rota de atualização do pensamento
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.removeTought) // Remover pensamento
router.get('/', ToughtController.showToughts)

module.exports = router // Exporto o módulo router