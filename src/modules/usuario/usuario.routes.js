const express = require("express");
const { perfilUsuario } = require("./usuario.controller");
const verificarToken = require("../../middlewares/verificarToken");
const rotaUsuario = express.Router();

//rotaUsuario.post("/cadastrarUsuario", )

rotaUsuario.get("/perfilUsuario", verificarToken, perfilUsuario);

module.exports = rotaUsuario;
