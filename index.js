//Configurações
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')

//controllers
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

//Models:
const Article = require('./articles/Article')
const Category = require('./categories/Category')

app.set('view engine', 'ejs');

//body-parser: extended false quando o objeto de retorno puder ser string ou array. Quando puder ser qualquer coisa ficaria true
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Conexão com o banco:
connection
    .authenticate()
    .then(() => {
        console.log("conexão com o bando de dados feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//Static: express aceitar trabalhar com arquivos estáticos
app.use(express.static('public'))

//rota principal
app.get('/', (req, res) => {
    res.render('index')
})

//Rotas controllers:
app.use("/", categoriesController) //quero sem prefixo
app.use("/", articlesController)

//servidor
app.listen(8080, () => {
    console.log("Servidor está rodando!")
})


