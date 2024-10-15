const {
  paymentCassoRepository,
} = require("../repositories/payment-casso.repository");
const { IPaymentCasso } = require("./interfaces/payment-casso.interface");

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
