const assert = require("node:assert/strict");
const {
  DEFAULT_ROI_INPUT,
  calcularRoiEcossistema,
  normalizeRoiInput,
} = require("./roi-engine");

function approx(actual, expected, message) {
  assert.equal(Math.round(actual * 100000) / 100000, expected, message);
}

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

test("calculo base com exemplo do spec", () => {
  const result = calcularRoiEcossistema(DEFAULT_ROI_INPUT);

  assert.equal(result.horasEconomizadasAno, 18750);
  assert.equal(result.valorHorasEconomizadas, 1500000);
  assert.equal(result.errosEvitados, 37500);
  assert.equal(result.valorErrosEvitados, 1875000);
  assert.equal(result.valorReceitaIncremental, 108000);
  assert.equal(result.beneficioTotalAnual, 3483000);
  assert.equal(result.custoTotalPrimeiroAno, 180000);
  assert.equal(result.roiLiquido, 3303000);
  assert.equal(result.roiPercentual, 1835);
  assert.equal(result.paybackMeses, 0.6);
});

test("ROI infinito quando custo total for zero", () => {
  const result = calcularRoiEcossistema({
    ...DEFAULT_ROI_INPUT,
    custoImplementacao: 0,
    custoOperacaoAnual: 0,
  });

  assert.equal(result.roiPercentual, Infinity);
});

test("payback infinito quando beneficio total for zero", () => {
  const result = calcularRoiEcossistema({
    ...DEFAULT_ROI_INPUT,
    numFuncionarios: 0,
    receitaIncrementalMensal: 0,
  });

  assert.equal(result.beneficioTotalAnual, 0);
  assert.equal(result.paybackMeses, Infinity);
});

test("receita incremental usa valor mensal vezes 12 vezes margem", () => {
  const result = calcularRoiEcossistema({
    ...DEFAULT_ROI_INPUT,
    numFuncionarios: 0,
    receitaIncrementalMensal: 10000,
    margemContribuicao: 0.25,
  });

  assert.equal(result.valorReceitaIncremental, 30000);
});

test("erros evitados sao 50% dos erros atuais", () => {
  const result = calcularRoiEcossistema({
    ...DEFAULT_ROI_INPUT,
    numFuncionarios: 10,
    tarefasDiaPorFuncionario: 20,
    diasUteisAno: 200,
    taxaErroAtual: 0.1,
  });

  assert.equal(result.errosEvitados, 2000);
});

test("ROI percentual e payback sao arredondados para 1 casa decimal", () => {
  const result = calcularRoiEcossistema({
    numFuncionarios: 1,
    horasEconomizadasDia: 1,
    custoHoraFuncionario: 10,
    diasUteisAno: 10,
    taxaErroAtual: 0,
    custoMedioErro: 0,
    tarefasDiaPorFuncionario: 0,
    receitaIncrementalMensal: 0,
    margemContribuicao: 0,
    custoImplementacao: 33,
    custoOperacaoAnual: 0,
  });

  assert.equal(result.roiPercentual, 203);
  assert.equal(result.paybackMeses, 4);
});

test("valores negativos sao normalizados e percentuais sao limitados", () => {
  const normalized = normalizeRoiInput({
    numFuncionarios: -1,
    taxaErroAtual: 2,
    margemContribuicao: -0.5,
    custoImplementacao: -100,
  });

  assert.equal(normalized.numFuncionarios, 0);
  assert.equal(normalized.taxaErroAtual, 1);
  assert.equal(normalized.margemContribuicao, 0);
  assert.equal(normalized.custoImplementacao, 0);
});
