require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({ raw: true });
  res.render("usuarios", { usuarios });
});

app.get("/jogos", async (req, res) => {
    const jogos = await Jogo.findAll({ raw: true });
    res.render("jogos", { jogos });  
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

app.get("/usuarios/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await Usuario.destroy({ where: { id } });
    res.send(`<script>alert("Usuário deletado com sucesso"); window.location.href = '/usuarios';</script>`);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.send(`<script>alert("Erro ao deletar usuário: ${error.message}"); window.location.href = '/usuarios';</script>`);
  }
});

app.get("/jogos/novo", (req, res) => {
  res.render("formJogo");
});

app.post("/jogos/novo", async (req, res) => {
  const { titulo, descricao, precoBase } = req.body;

  try {
    const jogo = await Jogo.create({
      titulo,
      descricao,
      precoBase,
    });
    res.send(`<script>alert("Jogo inserido sob o id ${jogo.id}"); window.location.href = '/jogos';</script>`);
  } catch (error) {
    console.error("Erro ao criar jogo:", error);
    res.send(`<script>alert("Erro ao criar jogo: ${error.message}"); window.location.href = '/jogos/novo';</script>`);
  }
});


app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});

app.post("/usuarios/novo", async (req, res) => {
  const { nickname, nome } = req.body;

  try {
    const usuario = await Usuario.create({ nickname, nome });
    res.send(`<script>alert("Usuário inserido sob o id ${usuario.id}"); window.location.href = '/usuarios/novo';</script>`);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.send(`<script>alert("Erro ao criar usuário: ${error.message}"); window.location.href = '/usuarios/novo';</script>`);
  }
});



// Rota para renderizar o formulário de edição de jogos
app.get("/jogos/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = await Jogo.findByPk(id, { raw: true });
  res.render("formJogo", { jogo });
});


app.post("/jogos/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, precoBase } = req.body;

  try {
    await Jogo.update({ titulo, descricao, precoBase }, { where: { id } });
    res.send(`<script>alert("Jogo atualizado com sucesso"); window.location.href = '/jogos';</script>`);
  } catch (error) {
    console.error("Erro ao atualizar jogo:", error);
    res.send(`<script>alert("Erro ao atualizar jogo: ${error.message}"); window.location.href = '/jogos';</script>`);
  }
});


app.get("/jogos/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await Jogo.destroy({ where: { id } });
    res.send(`<script>alert("Jogo deletado com sucesso"); window.location.href = '/jogos';</script>`);
  } catch (error) {
    console.error("Erro ao deletar jogo:", error);
    res.send(`<script>alert("Erro ao deletar jogo: ${error.message}"); window.location.href = '/jogos';</script>`);
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
