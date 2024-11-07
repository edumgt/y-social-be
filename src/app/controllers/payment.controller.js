const { paymentService } = require("../services/payment.service");
const { handleRequest } = require("../utils/handle-request");

class PaymentController  {
    async getAll(req, res) {
        await handleRequest(req, res, async () => {
            return await paymentService.getAll();
        });
    }

    async getPaymentByUserId(req, res) {
        await handleRequest(req, res, async () => {
            const userID = req.params.userID;
            return await paymentService.getPaymentByUserId(userID);
        });
    }
}

const paymentController = new PaymentController();

module.exports = {
    paymentController,
};
