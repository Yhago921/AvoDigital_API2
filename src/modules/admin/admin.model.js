const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Usuario = require("../usuario/usuario.model");

const admin = sequelize.define("admins", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
});

admin.belongsTo(Usuario, {
  foreignKey: "IdUsuario",
  constraint: true,
});

Usuario.hasOne(admin, {
  foreignKey: "IdUsuario",
  constraint: true,
});

module.exports = admin;
