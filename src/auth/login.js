const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../modules/usuario/usuario.model");
const admin = require("../modules/admin/admin.model");

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

    const encontrarUsuario = await Usuario.findOne({
      where: { email },
    });

    if (!encontrarUsuario) {
      return res.status(404).json({ retorno: "Usuário não encontrado" });
    }

    /* const e_Usuario_ou_Admin =
      encontrarUsuario.tipo === "admin"
        ? await Usuario.findOne({
            where: { email },
            include: { model: admin },
          })
        : await Usuario.findOne({
            where: { email },
            include: { model: estudante },
          });
*/
    const senhaValida = await bcrypt.compare(senha, encontrarUsuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ retorno: "Email ou Senha Incorreta" });
    }

    const token = jwt.sign(
      { id: encontrarUsuario.id, tipo: encontrarUsuario.tipo },
      SECRET_TOKEN,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      tipo: encontrarUsuario.tipo,
      token,
      retorno: "Login feito com sucesso",
    });
  } catch (erro) {
    console.error(erro);
    return res
      .status(500)
      .json({ retorno: "Houve um erro. Tente mais tarde!" });
  }
};

module.exports = login;
