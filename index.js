const express=require("express")
const app=express()
const  bd=require('./models/bd')
const Post = require('./models/Post')
const handlebars=require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
const { Router } = require("express")

//config nossa template engine




app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//public
app.use(express.static('public'));

//configurando o pody parser

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//ROTAS...

app.get('/',function(req,res){
    Post.findAll({order: [['id','DESC']]}).then(function(posts){
        res.render('home',{posts:posts})
    })
})

app.get('/formulario',function(req,res){
    //res.send('rota de cadastro')
    res.render('./formulario')    
})

    
app.post('/add',function(req,res){

    Post.create({
        preco:req.body.preco,
        titulo:req.body.titulo,
        descricao:req.body.descricao,
        conteudo:req.body.conteudo

    }).then(function(){
        res.redirect('/')
    
    }).catch(function(erro){

        res.send("houve um erro "+erro)

    })   
})

app.get('/apagar/:id', function(req, res){

    console.log(req.params.id);

    Post.destroy({where: {'id': req.params.id}}).then(function(){

        res.redirect("/")

    }).catch(function(erro){

        res.send("Não foi possivel apagar o seu post : "+erro)

    }) 

});
app.get('/alterar/:id',function(req,res){
    Post.findByPk(req.params.id).then(function(post){
        res.render('./alterar',{preco:post.preco,descricao:post.descricao, titulo:post.titulo,conteudo:post.conteudo,id:post.id})
    })

})

app.post('/alterarnovo',function(req,res){
    Post.update({
        preco:req.body.preco,
        descricao:req.body.descricao,
        titulo:req.body.titulo,
        conteudo:req.body.conteudo},
        {where:{id: req.body.id}}).then(function(){
            res.redirect("/")})
})


/*app.get('/alterar/:id',function(req,res){
    Post.update({
        titulo:req.body.titulo,
        conteudo:req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){

        res.send("houve um erro "+erro)

    })   
    
})/*




/*app.get('/admpost',function(req,res){
    //res.send('rota de cadastro')
    Post.findAll().then(function(posts){
        res.render('admPost',{posts: posts})
    })

})*/

app.listen(3000,function(){

    console.log("rodando na porta 3000")

})