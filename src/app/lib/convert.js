const { CURRENCY, CURRENCY_RATE } = require("../constants/currency");
const { ICurrencyConverter } = require("../interfaces/currency.interface");

class CurrencyConverter extends ICurrencyConverter {
  convert(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    if (fromCurrency === CURRENCY.USD && toCurrency === CURRENCY.VND) {
      return amount * CURRENCY_RATE.USD_TO_VND_RATE;
    } else if (fromCurrency === CURRENCY.VND && toCurrency === CURRENCY.USD) {
      return amount / CURRENCY_RATE.USD_TO_VND_RATE;
    } else {
      throw new Error("Unsupported currency conversion");
    }
  }
}

module.exports = { CurrencyConverter };
