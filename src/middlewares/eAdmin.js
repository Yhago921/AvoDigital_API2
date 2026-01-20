const eAdmin = (req, res, next) => {
  try {
    if (req.usuario.tipo !== "admin") {
      return res.status(401).json({
        retorno: "Acesso não Autorizado. Você precisa ser administrador",
      });
    }
    next();
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Erro no servidor" });
  }
};

module.exports = eAdmin;
