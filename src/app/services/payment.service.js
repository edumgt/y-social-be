const { paymentRepository } = require("../repositories/payment.repository");
const { ERRORS } = require("../constants/error");

class PaymentService {
    async getAll() {
        try {
            const result = await paymentRepository.getAll();
            return {
                message: "Successfully",
                count: result.length,
                data: result
            };
        } catch (error) {
            console.error(ERRORS.DEFAULT, error);
            throw new Error(ERRORS.DEFAULT);
        }
    }

    async getPaymentByUserId(userId) {
        try {
            const result = await paymentRepository.getPaymentByUserId(userId);
            return {
                message: "Successfully",
                count: result.length,
                data: result
            };
        } catch (error) {
            console.error(ERRORS.DEFAULT, error);
            throw new Error(ERRORS.DEFAULT);
        }
    }
}

const paymentService = new PaymentService();

module.exports = { paymentService };
