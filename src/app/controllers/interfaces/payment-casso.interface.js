class IPaymentCasso {
  async getAll() {
    throw new Error(`getAll() method is not implemented.`);
  }

  async handlerBankTransfer() {
    throw new Error(`handlerBankTransfer() method is not implemented.`);
  }

  async createPayment() {
    throw new Error(`createPayment() method is not implemented.`);
  }

  async handleUserPaid() {
    throw new Error(`handleUserPaid() method is not implemented.`);
  }

  async handleUpdateBalance() {
    throw new Error(`handleUpdateBalance() method is not implemented.`);
  }

  async handleCreateWebhook() {
    throw new Error(`handleCreateWebhook() method is not implemented.`);
  }
}

module.exports = { IPaymentCasso };
