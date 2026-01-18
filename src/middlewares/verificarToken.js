const jwt = require("jsonwebtoken");

const SECRET_TOKEN =
  "sjkdbLIUNERHO8WNTHOVF6W8M8EE8766667w&&&//useyromxeyrngbcoemnt";

const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ retorno: "token inválido" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ retorno: "Token não fornecido" });
    }
    const decoded = jwt.verify(token, SECRET_TOKEN);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Ups...Houve um erro no servidor" });
  }
};

module.exports = verificarToken;
 