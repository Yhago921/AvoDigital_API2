const lista_para_bloquear_Token = [];
const logout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ retorno: "token não fornecido" });
    }
    const token = authHeader.split(" ")[1];

    lista_para_bloquear_Token.push(token);

    return res.status(200).json({ retorno: "Sessão terminada com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res
      .status(500)
      .json({ retorno: "Houve um erro no servidor ao terminar sessão" });
  }
};

module.exports = { lista_para_bloquear_Token, logout };
