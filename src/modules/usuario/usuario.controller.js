const pessoa = require("../pessoa/pessoa.model");
const usuario = require("./usuario.model");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, ultimoNome, email, dataNascimento, senha } = req.body;
    if (!nome || !ultimoNome || !email || !dataNascimento) {
      return res
        .status(400)
        .json({ retorno: "Todos os campos são obrigatórios!" });
    }
    const emailJaExiste = await pessoa.findOne({ where: { email: email } });
    if (emailJaExiste) {
      return res.status(409).json({
        retorno: "Já existe alguém cadastrado com este email",
      });
    }

    const pessoaCriada = await pessoa.create({
      nome,
      ultimoNome,
      email,
      dataNascimento,
    });

    await usuario.create({
      senha: await bcrypt.hash(senha, 8),
      pessoaId: pessoaCriada.id,
    });
    return res.status(201).json({ retorno: "Cadastro feito com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};
module.exports = cadastrarUsuario;
