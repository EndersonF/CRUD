const Sequelize = require('sequelize')
const sequelize= new Sequelize('test01','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(function(){
    console.log("conectou")
}).catch(function(erro){
    console.log("falha ao se conectar"+erro)
})

module.exports={
    Sequelize:Sequelize,
    sequelize:sequelize
}