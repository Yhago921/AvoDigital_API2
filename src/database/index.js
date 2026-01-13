const path = require("path");
const sequelize = require("sequelize");

require("dotenv").config({ path: path.resolve(".env") });

console.log(process.env.DATABASE_NAME);

const Sequelize = new sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

Sequelize.authenticate()
  .then(() => {
    console.log("Conectado a base de dados com sucesso");
  })
  .catch((erro) => {
    console.error(`Erro ao conectar a base de dados: ${erro}`);
  });

module.exports = Sequelize;
