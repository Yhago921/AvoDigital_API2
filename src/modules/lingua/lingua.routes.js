const express = require("express");
const cadastrarLingua = require("./lingua.controller");
const verificarToken = require("../../middlewares/verificarToken");
const rotaLingua = express.Router();

rotaLingua.post("/cadastrarLingua", verificarToken, cadastrarLingua);

module.exports = rotaLingua;
