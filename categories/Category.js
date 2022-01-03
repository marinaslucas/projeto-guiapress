//Model Category (tabela): comunicação com o banco de dados 
const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define("categories", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//O sync com o force true vai criar a tabela toda vez q rodar a aplicação, então só deve ser colocado uma vez para criação da tabela
/* Category.sync({
    force: true
})  */ 

module.exports = Category;
