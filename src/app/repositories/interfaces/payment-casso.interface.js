const { ERRORS } = require("../constants/error");

class IPaymentCasso {
    async getAll() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: getAll() method is not implemented.`);
    }

    async createPayment() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: createPayment() method is not implemented.`);
    }

    async handleUserPaid() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: handleUserPaid() method is not implemented.`);
    }

    async handleUpdateBalance() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: handleUpdateBalance() method is not implemented.`);
    }
}

module.exports = { IPaymentCasso };
