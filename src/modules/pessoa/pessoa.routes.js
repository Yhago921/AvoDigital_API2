const express = require("express");
const cadastrarPessoa = require("./pessoa.controller");
const rotaPessoa = express.Router();

rotaPessoa.post("/cadastrarPessoa", cadastrarPessoa);

module.exports = rotaPessoa;
