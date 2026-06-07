(function () {
  const { DEFAULT_ROI_INPUT, calcularRoiEcossistema, normalizeRoiInput } = window.RoiEngine;
  const {
    formatMoney,
    formatNumber,
    formatPercent,
    formatMonths,
    formatHours,
  } = window.RoiFormatters;

  const form = document.getElementById("roi-form");
  const resetButton = document.getElementById("reset-button");
  const taxaErroAtualLabel = document.getElementById("taxaErroAtual-label");
  const margemContribuicaoLabel = document.getElementById("margemContribuicao-label");

  const output = {
    beneficioTotalAnual: document.getElementById("beneficioTotalAnual"),
    roiPercentual: document.getElementById("roiPercentual"),
    paybackMeses: document.getElementById("paybackMeses"),
    roiLiquido: document.getElementById("roiLiquido"),
    custoTotalPrimeiroAno: document.getElementById("custoTotalPrimeiroAno"),
    valorHorasEconomizadas: document.getElementById("valorHorasEconomizadas"),
    horasEconomizadasAno: document.getElementById("horasEconomizadasAno"),
    valorErrosEvitados: document.getElementById("valorErrosEvitados"),
    errosEvitados: document.getElementById("errosEvitados"),
    valorReceitaIncremental: document.getElementById("valorReceitaIncremental"),
    investimentoDetalhe: document.getElementById("investimentoDetalhe"),
  };

  function setFormValues(values) {
    Object.entries(values).forEach(([key, value]) => {
      const control = form.elements[key];
      if (control) {
        control.value = value;
      }
    });

    form.elements.taxaErroAtualPercent.value = Math.round(values.taxaErroAtual * 100);
    form.elements.margemContribuicaoPercent.value = Math.round(values.margemContribuicao * 100);
  }

  function readFormValues() {
    return normalizeRoiInput({
      numFuncionarios: form.elements.numFuncionarios.value,
      horasEconomizadasDia: form.elements.horasEconomizadasDia.value,
      custoHoraFuncionario: form.elements.custoHoraFuncionario.value,
      diasUteisAno: form.elements.diasUteisAno.value,
      taxaErroAtual: Number(form.elements.taxaErroAtualPercent.value) / 100,
      custoMedioErro: form.elements.custoMedioErro.value,
      tarefasDiaPorFuncionario: form.elements.tarefasDiaPorFuncionario.value,
      receitaIncrementalMensal: form.elements.receitaIncrementalMensal.value,
      margemContribuicao: Number(form.elements.margemContribuicaoPercent.value) / 100,
      custoImplementacao: form.elements.custoImplementacao.value,
      custoOperacaoAnual: form.elements.custoOperacaoAnual.value,
      moeda: form.elements.moeda.value,
    });
  }

  function render() {
    const values = readFormValues();
    const result = calcularRoiEcossistema(values);
    const currency = values.moeda;

    taxaErroAtualLabel.textContent = `${formatNumber(values.taxaErroAtual * 100, 0)}%`;
    margemContribuicaoLabel.textContent = `${formatNumber(values.margemContribuicao * 100, 0)}%`;

    output.beneficioTotalAnual.textContent = formatMoney(result.beneficioTotalAnual, currency);
    output.roiPercentual.textContent = formatPercent(result.roiPercentual);
    output.paybackMeses.textContent = formatMonths(result.paybackMeses);
    output.roiLiquido.textContent = formatMoney(result.roiLiquido, currency);
    output.custoTotalPrimeiroAno.textContent = formatMoney(result.custoTotalPrimeiroAno, currency);
    output.valorHorasEconomizadas.textContent = formatMoney(result.valorHorasEconomizadas, currency);
    output.horasEconomizadasAno.textContent = `${formatHours(result.horasEconomizadasAno)} economizadas no ano`;
    output.valorErrosEvitados.textContent = formatMoney(result.valorErrosEvitados, currency);
    output.errosEvitados.textContent = `${formatNumber(result.errosEvitados, 1)} erros evitados`;
    output.valorReceitaIncremental.textContent = formatMoney(result.valorReceitaIncremental, currency);
    output.investimentoDetalhe.textContent = formatMoney(result.custoTotalPrimeiroAno, currency);
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  resetButton.addEventListener("click", function () {
    setFormValues(DEFAULT_ROI_INPUT);
    render();
  });

  setFormValues(DEFAULT_ROI_INPUT);
  render();
})();
