const jwt = require("jsonwebtoken");
const { lista_para_bloquear_Token } = require("../auth/logout");
const SECRET_TOKEN =
  "sjkdbLIUNERHO8WNTHOVF6W8M8EE8766667w&&&//useyromxeyrngbcoemnt";

const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ retorno: "token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ retorno: "Token inválido ou Expirado" });
    }
    if (lista_para_bloquear_Token.find((t) => t === token)) {
      return res.status(401).json({ retorno: "Token Inválido ou bloqueado" });
    }
    const decoded = jwt.verify(token, SECRET_TOKEN);

    req.usuario = decoded;
    next();
  } catch (erro) {
    if (erro.name === "TokenExpiredError") {
      return res.status(401).json({
        retorno: "Você será desconectado. Faça login novamente.",
      });
    }
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};

module.exports = verificarToken;
