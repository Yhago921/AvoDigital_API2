const express = require("express");
const cadastrarUsuario = require("./usuario.controller");
const userRoute = express.Router();

userRoute.post("/cadastrarUsuario", cadastrarUsuario);

module.exports = userRoute;
