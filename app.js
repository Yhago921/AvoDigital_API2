const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/modules/admin/admin.routes");
const personRoute = require("./src/modules/pessoa/pessoa.routes");
const userRoute = require("./src/modules/usuario/usuario.routes");
const login = require("./src/auth/login");

const app = express();
const porta = process.env.PORT || 4002;

app.use(express.json());

app.use(cors());

app.post("/login", login);

app.use("/admin", adminRoutes);
app.use("/pessoas", personRoute);
app.use("/usuarios", userRoute);

app.listen(porta, (err) => {
  if (err) {
    console.log("Erro ao rodar o Servidor" + err);
  }
  console.log(`Servidor rodando na porta: ${porta}`);
});
