const express = require("express")
const router = express.Router()

const Category = require("./Category")
const slugify = require("slugify")
const { redirect } = require("express/lib/response")

router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/new') //render para ejs
})

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({ //chamo o Model
            title: title,
            slug: slugify(title) //biblioteca do node para otimizar a string para ser utilizada na rota
        }).then( () => {
            res.redirect("/admin/categories")
        })
    }else{
        res.redirect("/admin/categories/new") //redirect para router existente
    }
})

router.get("/admin/categories", (req,res) => { 

    Category.findAll({raw: true, order:[['id','ASC']]
    }).then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        }) //render: caminho do para arquivo a ser carregado com a rota nova
    })
})

router.post("/categories/delete", (req,res) => {
    var id = req.body.id;
    if (id != undefined){
        if(!isNaN(id)){ //serve para verificar se é um número
            Category.destroy({
                where: { //recebendo um json
                    id: id
                }
            }).then( () => {
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("admin/categories")
    }
})

router.get("/admin/categories/edit/:id",(req,res) => {
    var id = req.params.id

    if (isNaN(id)){ //validando pq se colocasse 12fgjjfoi ele reconhceria o id 12. Então se nao for um numero, vai redirecionar a rota
        res.redirect("/admin/categories")
    }
    Category.findByPk(id).then(category => { //essa funcao é mais prática para encontrar um elemento pelo id
        if (category != undefined){
            res.render("admin/categories/edit", {category: category})
        }else{
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories")
    })
})

module.exports = router;