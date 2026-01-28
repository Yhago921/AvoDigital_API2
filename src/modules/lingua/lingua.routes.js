const express = require("express");
const verificarToken = require("../../middlewares/verificarToken");
const {
  cadastrarLingua,
  deletarLingua,
  actualizarLingua,
  exibirLinguasCadastradas,
  alterarEstadoDaLingua,
} = require("./lingua.controller");
const eAdmin = require("../../middlewares/eAdmin");
const rotaLingua = express.Router();

rotaLingua.post("/cadastrarLingua", verificarToken, eAdmin, cadastrarLingua);

rotaLingua.post("/deletarLingua/:id", verificarToken, eAdmin, deletarLingua);

rotaLingua.get("/exibirtodasLinguas", exibirLinguasCadastradas);

rotaLingua.post(
  "/actualizarLingua/:id",
  verificarToken,
  eAdmin,
  actualizarLingua,
);

rotaLingua.post(
  "/alterarEstadoDaLingua/:id",
  verificarToken,
  eAdmin,
  alterarEstadoDaLingua,
);

module.exports = rotaLingua;
