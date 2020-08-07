const bd = require('./bd')

const Post=bd.sequelize.define('postagens',{
    preco:{type:bd.Sequelize.DOUBLE},
    descricao:{type:bd.Sequelize.TEXT},
    titulo:{type:bd.Sequelize.TEXT},
    conteudo:{type:bd.Sequelize.TEXT}
})

//Post.sync({force:true})//
module.exports=Post