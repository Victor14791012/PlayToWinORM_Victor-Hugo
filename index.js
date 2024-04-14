require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");

conn.sync().then(() => {
    console.log("Banco de dados conectado e estruturado sincronizada!");
}).catch((err) => {
    console.log("Erro ao conectar")
});


//conn.authenticate().then( () => {
  //  console.log("Conectado ao banco de dados com sucesso!");
//}).catch( (err) => {
  //  console.log("Ocorreu um erro: " + err);
//})
    
   