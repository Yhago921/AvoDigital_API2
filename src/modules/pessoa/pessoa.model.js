const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const Pessoa = sequelize.define("pessoas", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Pessoa;
