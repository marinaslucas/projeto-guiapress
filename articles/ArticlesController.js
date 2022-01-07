const express = require("express")
//importanto o model de categoria para eu conseguir listar as categorias nesta view
const Category = require('../categories/Category')
const router = express.Router();
//importando o model do article e o slugfy para armazenar os articles criados
const Article = require("./Article")
const slugify = require("slugify")


//joins com sequelize: include
router.get("/admin/articles", (req, res) => {
    Article.findAll({
            include: [{model: Category}]
    }).then( articles => {
        res.render("admin/articles/index", {articles: articles})
    })
})
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
})

router.post("/articles/save", (req,res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category //id

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category //foreign key, id da categoria que irá para a tabela de artigos, fazendo referencia a esse id da categoria, criando um relacionamento
    }).then( ()=> {
        res.redirect("/admin/articles")
    })
})

router.post("/articles/delete", (req,res) => {
    var id = req.body.id;
    if (id != undefined){
        if(!isNaN(id)){ //serve para verificar se é um número
            Article.destroy({
                where: { //recebendo um json
                    id: id
                }
            }).then( () => {
                res.redirect("/admin/articles")
            })
        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("admin/articles")
    }
})

router.get("/admin/articles/edit/:id", (req,res) => {
    var id = req.params.id
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {categories: categories, article: article})
            })
        }else{
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

module.exports = router;