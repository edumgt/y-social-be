const { ERRORS } = require("../constants/error");
const { adsRepository } = require("../repositories/ads.repository");
const { paymentCassoRepository } = require("../repositories/payment-casso.repository");
const { ERROR_ADS_SERVICE } = require("./constants/error");
const { IPaymentCasso } = require("./interfaces/payment-casso.interface");
const moment = require("moment");

class PaymentCassoService extends IPaymentCasso {
    async getAll() {
        return await paymentCassoRepository.getAll();
    }

    async handlerBankTransfer() {
        return await paymentCassoRepository.handlerBankTransfer();
    }

    async createPayment() {
        return await paymentCassoRepository.createPayment();
    }

    async handleUserPaid() {
        const paymentList = await this.handlerBankTransfer();
        return await paymentCassoRepository.handleUserPaid(paymentList);
    }

    async handleUpdateBalance() {
        return await paymentCassoRepository.handleUpdateBalance();
    }
}

const paymentCassoService = new PaymentCassoService();

module.exports = { paymentCassoService };
