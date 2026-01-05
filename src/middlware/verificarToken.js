const jwt = require("jsonwebtoken");
const verificarToken = (req, res) => {
  try {
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};

export default verificarToken;
