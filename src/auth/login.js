const Pessoa = require("../modules/pessoa/pessoa.model");
const Usuario = require("../modules/usuario/usuario.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const SECRET_TOKEN =
  "sjkdbLIUNERHO8WNTHOVF6W8M8EE8766667w&&&//useyromxeyrngbcoemnt";


const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ retorno: "Todos os campos são obrigatórios" });
    }

    const pessoa = await Pessoa.findOne({
      where: { email },
      include: {
        model: Usuario,
      },
    });

    if (!pessoa || !pessoa.usuario) {
      return res.status(400).json({ retorno: "Email ou senha incorreta" });
    }

    const senhaValida = await bcrypt.compare(senha, pessoa.usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ retorno: "Email ou senha incorreta" });
    }

    const token = jwt.sign({ id: pessoa.id }, SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      usuario: {
        id: pessoa.id,
        nome: pessoa.nome,
        email: pessoa.email,
      },
    });
  } catch (erro) {
    console.error(erro);
    return res
      .status(500)
      .json({ retorno: "Houve um erro. Tente mais tarde!" });
  }
};

module.exports = login;
