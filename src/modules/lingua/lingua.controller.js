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

const deletarLingua = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ retorno: "Id da língua não encontrado" });
    }
    const linguaSelecionada = await lingua.findByPk(id);

    if (!linguaSelecionada) {
      return res.status(404).json({ retorno: "Língua não encontrada" });
    }

    await linguaSelecionada.destroy();

    return res.status(500).json({ retorno: "Língua deletada com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Errono servidor" });
  }
};

const actualizarLingua = async (req, res) => {
  try {
    const { id } = req.params;
    const nomeactualizado = req.body.nome;
    if (!id) {
      return res
        .status(404)
        .json({ retorno: "É obrigatório para executar esta operação" });
    }

    if (!nomeactualizado) {
      return res
        .status(404)
        .json({ retorno: "preencha todos os campos, por favor!" });
    }

    const encontrarLingua = await lingua.findByPk(id);

    if (!encontrarLingua) {
      return res.status(404).json({ retorno: "Id não encontrado" });
    }
    console.log(nomeactualizado);
    await lingua.update(
      { nome: nomeactualizado },
      {
        where: {
          id,
        },
      },
    );

    return res.status(200).json({ retorno: "Nome actualizado com sucesso!" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({
      retorno:
        "Houve um erro no servidor ao actualizar a lingua. Tente mais tarde!",
    });
  }
};

const exibirLinguasCadastradas = async (req, res) => {
  try {
    return res.status(200).json(await lingua.findAll());
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "awesome" });
  }
};

const alterarEstadoDaLingua = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ retorno: "É obrigatório Id para executar esta operação" });
    }

    const encontrarLingua = await lingua.findByPk(id);

    if (!encontrarLingua) {
      return res.status(404).json({ retorno: "Id não encontrado" });
    }
    await lingua.update(
      { ativo: !encontrarLingua.ativo },
      { where: { id: id } },
    );
    return res
      .status(200)
      .json({ retorno: "Estado da língua alterado com sucesso" });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ retorno: "Houve um erro no servidor" });
  }
};

module.exports = {
  cadastrarLingua,
  deletarLingua,
  actualizarLingua,
  exibirLinguasCadastradas,
  alterarEstadoDaLingua,
};
