(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.RoiEngine = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const REDUCAO_ERROS_FIXA = 0.5;

  const DEFAULT_ROI_INPUT = Object.freeze({
    numFuncionarios: 50,
    horasEconomizadasDia: 1.5,
    custoHoraFuncionario: 80,
    diasUteisAno: 250,
    taxaErroAtual: 0.15,
    custoMedioErro: 50,
    tarefasDiaPorFuncionario: 40,
    receitaIncrementalMensal: 30000,
    margemContribuicao: 0.3,
    custoImplementacao: 120000,
    custoOperacaoAnual: 60000,
    moeda: "BRL",
  });

  function toFiniteNumber(value, fallback) {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : fallback;
  }

  function normalizeNonNegative(value, fallback) {
    return Math.max(0, toFiniteNumber(value, fallback));
  }

  function clampPercent(value, fallback) {
    return Math.min(1, Math.max(0, toFiniteNumber(value, fallback)));
  }

  function roundOneDecimal(value) {
    if (!Number.isFinite(value)) {
      return value;
    }

    return Math.round((value + Number.EPSILON) * 10) / 10;
  }

  function normalizeRoiInput(input) {
    const source = input || {};
    const defaults = DEFAULT_ROI_INPUT;

    return {
      numFuncionarios: normalizeNonNegative(source.numFuncionarios, defaults.numFuncionarios),
      horasEconomizadasDia: normalizeNonNegative(source.horasEconomizadasDia, defaults.horasEconomizadasDia),
      custoHoraFuncionario: normalizeNonNegative(source.custoHoraFuncionario, defaults.custoHoraFuncionario),
      diasUteisAno: normalizeNonNegative(source.diasUteisAno, defaults.diasUteisAno),
      taxaErroAtual: clampPercent(source.taxaErroAtual, defaults.taxaErroAtual),
      custoMedioErro: normalizeNonNegative(source.custoMedioErro, defaults.custoMedioErro),
      tarefasDiaPorFuncionario: normalizeNonNegative(
        source.tarefasDiaPorFuncionario,
        defaults.tarefasDiaPorFuncionario
      ),
      receitaIncrementalMensal: normalizeNonNegative(
        source.receitaIncrementalMensal,
        defaults.receitaIncrementalMensal
      ),
      margemContribuicao: clampPercent(source.margemContribuicao, defaults.margemContribuicao),
      custoImplementacao: normalizeNonNegative(source.custoImplementacao, defaults.custoImplementacao),
      custoOperacaoAnual: normalizeNonNegative(source.custoOperacaoAnual, defaults.custoOperacaoAnual),
      moeda: typeof source.moeda === "string" && source.moeda.trim() ? source.moeda.trim() : defaults.moeda,
    };
  }

  function calcularRoiEcossistema(input) {
    const normalized = normalizeRoiInput(input);

    const horasEconomizadasAno =
      normalized.numFuncionarios * normalized.horasEconomizadasDia * normalized.diasUteisAno;
    const valorHorasEconomizadas = horasEconomizadasAno * normalized.custoHoraFuncionario;

    const errosAtuaisAno =
      normalized.numFuncionarios *
      normalized.tarefasDiaPorFuncionario *
      normalized.diasUteisAno *
      normalized.taxaErroAtual;
    const errosEvitados = errosAtuaisAno * REDUCAO_ERROS_FIXA;
    const valorErrosEvitados = errosEvitados * normalized.custoMedioErro;

    const valorReceitaIncremental =
      normalized.receitaIncrementalMensal * 12 * normalized.margemContribuicao;
    const beneficioTotalAnual =
      valorHorasEconomizadas + valorErrosEvitados + valorReceitaIncremental;

    const custoTotalPrimeiroAno = normalized.custoImplementacao + normalized.custoOperacaoAnual;
    const roiLiquido = beneficioTotalAnual - custoTotalPrimeiroAno;
    const roiPercentual =
      custoTotalPrimeiroAno > 0 ? (roiLiquido / custoTotalPrimeiroAno) * 100 : Infinity;
    const paybackMeses =
      beneficioTotalAnual > 0 ? custoTotalPrimeiroAno / (beneficioTotalAnual / 12) : Infinity;

    return {
      horasEconomizadasAno,
      valorHorasEconomizadas,
      errosEvitados,
      valorErrosEvitados,
      valorReceitaIncremental,
      beneficioTotalAnual,
      custoTotalPrimeiroAno,
      roiLiquido,
      roiPercentual: roundOneDecimal(roiPercentual),
      paybackMeses: roundOneDecimal(paybackMeses),
    };
  }

  return {
    DEFAULT_ROI_INPUT,
    REDUCAO_ERROS_FIXA,
    calcularRoiEcossistema,
    normalizeRoiInput,
    roundOneDecimal,
  };
});
