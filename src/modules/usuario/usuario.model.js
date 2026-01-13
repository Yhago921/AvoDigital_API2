const { DataTypes } = require("sequelize");
const Sequelize = require("../../database");
const Pessoa = require("../pessoa/pessoa.model");

const usuario = Sequelize.define("usuarios", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  pessoaId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

usuario.belongsTo(Pessoa, {
  foreignKey: "pessoaId",
});

Pessoa.hasOne(usuario, {
  foreignKey: "pessoaId",
});

module.exports = usuario;
