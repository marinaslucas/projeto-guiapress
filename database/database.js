const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-3:00' //setar a timezone para que, nos campos da tabela createdAt ficar com a data e hora certa
})

module.exports = connection;

