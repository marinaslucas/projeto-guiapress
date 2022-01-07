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
const Category = require('./categories/Category');
const { redirect } = require('express/lib/response');

//view engine
app.set('view engine', 'ejs');

//Static: express aceitar trabalhar com arquivos estáticos
app.use(express.static('public'))

//body-parser: extended false quando o objeto de retorno puder ser string ou array. Quando puder ser qualquer coisa ficaria true
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Database: Conexão com o banco:
connection
    .authenticate()
    .then(() => {
        console.log("conexão com o bando de dados feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

    
//Rotas controllers:
app.use("/", categoriesController) //quero sem prefixo
app.use("/", articlesController)

//rota principal
app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories}) //passando as categorias para a minha view para fazer o menu de categorias
        })
    })
})

app.get("/:slug", (req,res) => {
    var slug = req.params.slug

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined){
            Category.findAll().then(categories => { //eu uso o findAll pq eu quero todas as categorias existentes. Se eu desse um include, acho que iria trazer apenas a categoria do artigo, visto que cada artigo tem apenas uma categoria
                res.render('article', {article: article, categories: categories}) //passando as categorias para a minha view para fazer o menu de categorias
            })
        }else{
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] //aqui eu uso o include pq irá buscar todos os artigos que pertencem à categoria. É diferente se eu usasse o findAll, iria buscar todos os artigos de todo o banco
    }).then(category => {
        if (category != undefined){
            Category.findAll().then( categories => {
                res.render("index", {articles: category.articles, categories: categories}) //mandando renderizar a view index com todas as categorias porque o homenavbar pede
            })
        }else{
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

//servidor
app.listen(8080, () => {
    console.log("Servidor está rodando!")
})



