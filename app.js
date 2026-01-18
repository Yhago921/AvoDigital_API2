const express = require("express");
const cors = require("cors");
const login = require("./src/auth/login");
const rotaUsuario = require("./src/modules/usuario/usuario.routes");
const app = express();
const porta = process.env.PORT || 4002;

app.use(express.json());

app.use(cors());

app.post("/auth/login", login);

app.use("/usuarios", rotaUsuario);

app.listen(porta, (err) => {
  if (err) {
    console.log("Erro ao rodar o Servidor" + err);
  }
  console.log(`Servidor rodando na porta: ${porta}`);
});
