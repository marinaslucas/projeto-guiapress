//Model Category: comunicação com o banco de dados 
const Sequelize = require("sequelize")
const connection = require("../database/database")

//definindo relacionamento com Category: devo importar o Category
const Category = require("../categories/Category")

const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },  body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//definindo relacionamento entre tabelas banco de dados
Category.hasMany(Article); //uma Categoria tem muitos artigos
Article.belongsTo(Category); //um Artigo tem apenas uma categoria

//O sync com o force true vai criar a tabela toda vez q rodar a aplicação, então só deve ser colocado uma vez para criação da tabela
/* Article.sync({
    force: true
}); */

module.exports = Article;
