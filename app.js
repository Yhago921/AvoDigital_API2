const express = require("express");
const adminRoutes = require("./src/modules/admin/admin.routes");
const personRoute = require("./src/modules/person/person.routes");
const userRoute = require("./src/modules/user/user.routes");

const app = express();
const porta = process.env.PORT || 4002;

app.use(express.json());

app.use(cors());

app.use("/admin", adminRoutes);
app.use("/pessoas", personRoute);
app.use("/usuarios", userRoute);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta: ${porta}`);
});
