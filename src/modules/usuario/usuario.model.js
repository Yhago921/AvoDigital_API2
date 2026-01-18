const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Usuario = sequelize.define("usuarios", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ultimoNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.ENUM("Masculino", "Feminino"),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tipo: {
    type: DataTypes.ENUM("estudante", "admin"),
    defaultValue: "estudante",
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
