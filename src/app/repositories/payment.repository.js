const PaymentModel = require("../models/payment.model");
const { IPayment } = require("./interfaces/payment.interface");

class PaymentRepository extends IPayment {
    async getAll() {
        return await PaymentModel.find();
    }

    async getPaymentByUserId(userID) {
        return await PaymentModel.find({ userID });
    }
}

const paymentRepository = new PaymentRepository();

module.exports = { paymentRepository };
