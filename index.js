require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo"); 
const express = require("express");
const exphbs= require("express-handlebars");

const app = express();
app.engine("handlebars",exphbs.engine());
app.set("view engine","handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({raw: true}); 
  res.render("usuarios" , {usuarios});
});



app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});

app.get("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = await Usuario.findByPk(id, { raw: true });
  res.render("formUsuario", { usuario });


});


app.post("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const { nickname, nome } = req.body;

  try {
    await Usuario.update({ nickname, nome }, { where: { id } });
    res.send(`<script>alert("Usuário atualizado com sucesso"); window.location.href = '/usuarios';</script>`);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.send(`<script>alert("Erro ao atualizar usuário: ${error.message}"); window.location.href = '/usuarios';</script>`);
  }
});

app.post("/usuarios/:id/delete", async (req, res) => {
  
});




app.get("/jogos/novo", (req, res) => {
  res.sendFile(`${__dirname}/views/formJogo.html`);
});



app.post("/usuarios/novo", async (req, res) => {
  const nickname = req.body.nickname;
  const nome = req.body.nome;

  const dadosUsuario = {
    nickname,
    nome,
  };

  try {
    const usuario = await Usuario.create(dadosUsuario);
    res.send(`<script>alert("Usuário inserido sob o id ${usuario.id}"); window.location.href = '/usuarios/novo';</script>`);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.send(`<script>alert("Erro ao criar usuário: ${error.message}"); window.location.href = '/usuarios/novo';</script>`);
  }
});




app.post("/jogos/novo", async (req, res) => {
  const { titulo, descricao, precoBase } = req.body;

  try {
    const jogo = await Jogo.create({
      titulo,
      descricao,
      precoBase,
    });
    res.send(`<script>alert("Jogo inserido sob o id ${jogo.id}"); window.location.href = '/jogos/novo';</script>`);
  } catch (error) {
    console.error("Erro ao criar jogo:", error);
    res.send(`<script>alert("Erro ao criar jogo: ${error.message}"); window.location.href = '/jogos/novo';</script>`);
  }
});


app.listen(8000, () => {
  console.log("Rodando na porta 8000");
});

conn.sync()
  .then(() => {
    console.log("Banco de dados conectado e estrutura sincronizada!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
