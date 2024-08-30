const { ICurrencyConverter } = require("../interfaces/currency.interface");
const { CURRENCY, CURRENCY_RATE } = require("../constants/currency");

class CurrencyConverter extends ICurrencyConverter {
    convert(amount, fromCurrency, toCurrency) {
        if (fromCurrency === CURRENCY.USD && toCurrency === CURRENCY.VND) {
            return amount * CURRENCY_RATE.USD_TO_VND_RATE;
        } else if (fromCurrency === CURRENCY.VND && toCurrency === CURRENCY.USD) {
            return amount / CURRENCY_RATE.USD_TO_VND_RATE;
        } else {
            throw new Error('Unsupported currency conversion');
        }
    }
}

module.exports = CurrencyConverter;
