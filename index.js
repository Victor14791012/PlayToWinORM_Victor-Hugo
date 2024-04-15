require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
  res.sendFile(`${__dirname}/views/formUsuario.html`);
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
