const Pessoa = require("./pessoa.model");

const cadastrarPessoa = async (req, res) => {
  try {
    const { nome, ultimoNome, email, dataNascimento } = req.body;
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

    await  Pessoa.create({
      nome,
      email,
      ultimoNome,
      dataNascimento,
    });

    return res.status(201).json({ retorno: "Cadastrado feito com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};
module.exports = cadastrarPessoa;
