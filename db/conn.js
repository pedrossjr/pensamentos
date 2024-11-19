require('dotenv').config({ path: './environments/.env' });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Conexão estabelecida com sucesso.'))
  .catch((error) => console.error('Erro ao conectar no banco:', error));

module.exports = sequelize