const lingua = require("./lingua.model");

const cadastrarLingua = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(404).json({ retorno: "Os campos são obrigatórios" });
    }

    const linguaExiste = await lingua.findOne({
      where: { nome },
    });

    if (
      linguaExiste &&
      linguaExiste.dataValues.nome.toLowerCase() === nome.toLowerCase()
    ) {
      return res
        .status(409)
        .json({ retorno: "Essa língua já está cadastrada" });
    }
    await lingua.create({
      nome,
    });
    return res.status(201).json({ retorno: "Língua cadastrada com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Houve um erro no servidor" });
  }
};

module.exports = cadastrarLingua;
