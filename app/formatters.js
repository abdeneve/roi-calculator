(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.RoiFormatters = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const DEFAULT_LOCALE = "pt-BR";

  function formatMoney(value, currency, locale) {
    if (!Number.isFinite(value)) {
      return "-";
    }

    return new Intl.NumberFormat(locale || DEFAULT_LOCALE, {
      style: "currency",
      currency: currency || "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatNumber(value, maximumFractionDigits) {
    if (!Number.isFinite(value)) {
      return "-";
    }

    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      maximumFractionDigits: maximumFractionDigits ?? 1,
    }).format(value);
  }

  function formatPercent(value) {
    if (!Number.isFinite(value)) {
      return "Sem custo informado";
    }

    return `${formatNumber(value, 1)}%`;
  }

  function formatMonths(value) {
    if (!Number.isFinite(value)) {
      return "Sem payback";
    }

    return `${formatNumber(value, 1)} meses`;
  }

  function formatHours(value) {
    return `${formatNumber(value, 1)} h`;
  }

  return {
    DEFAULT_LOCALE,
    formatMoney,
    formatNumber,
    formatPercent,
    formatMonths,
    formatHours,
  };
});
