const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const lingua = sequelize.define("linguas", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = lingua;
