class IPayment {
    async getAll() {
        throw new Error(`getAll() method is not implemented.`);
    }

    async getPaymentByUserId() {
        throw new Error(`getPaymentByUserId() method is not implemented.`);
    }
}

module.exports = { IPayment };
