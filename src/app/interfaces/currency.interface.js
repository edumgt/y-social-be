class ICurrencyConverter {
  convert(amount, fromCurrency, toCurrency) {
    throw new Error(
      "Method convert() not implemented",
      amount,
      fromCurrency,
      toCurrency,
    );
  }
}

module.exports = { ICurrencyConverter };
