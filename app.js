const express = require("express");
const cors = require("cors");
const login = require("./src/auth/login");
const app = express();
const rotaUsuario = require("./src/modules/usuario/usuario.routes");
const rotaLingua = require("./src/modules/lingua/lingua.routes");
const { logout } = require("./src/auth/logout");

const porta = process.env.PORT || 4002;

app.use(express.json());

app.use(cors());

app.post("/auth/login", login);
app.post("/auth/logout", logout);

app.use("/usuarios", rotaUsuario);
app.use("/linguas", rotaLingua);

app.listen(porta, (err) => {
  if (err) {
    console.log("Erro ao rodar o Servidor" + err);
  }
  console.log(`Servidor rodando na porta: ${porta}`);
});
