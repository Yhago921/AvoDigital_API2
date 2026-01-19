const { where, Model } = require("sequelize");
const Usuario = require("./usuario.model");
const bcrypt = require("bcrypt");
const admin = require("../admin/admin.model");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, ultimoNome, email, dataNascimento, senha } = req.body;
    if (!nome || !ultimoNome || !email || !dataNascimento) {
      return res
        .status(400)
        .json({ retorno: "Todos os campos são obrigatórios!" });
    }
    const emailJaExiste = await Usuario.findOne({ where: { email: email } });
    if (emailJaExiste) {
      return res.status(409).json({
        retorno: "Já existe alguém cadastrado com este email",
      });
    }

    await Usuario.create({
      nome,
      ultimoNome,
      email,
      dataNascimento,
      senha: await bcrypt.hash(senha, 8),
    });

    return res.status(201).json({ retorno: "Cadastro feito com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};

const perfilUsuario = async (req, res) => {
  try {
    const tipo = req.usuario.tipo;
    const id = req.usuario.id;

    const includeModel = tipo === "admin" ? admin : estudante;

    const encontrarUsuario = await Usuario.findOne({
      where: { id: id },
      include: [{ model: includeModel }],
      attributes: { exclude: ["senha"] },
    });

    return res.status(200).json({ encontrarUsuario: encontrarUsuario });
  } catch (erro) {
    return res.status(500).json({ retorno: erro });
  }
};

module.exports = { cadastrarUsuario, perfilUsuario };
