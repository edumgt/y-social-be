const { handleRequest } = require("../utils/handle-request");
const { IPaymentCasso } = require("./interfaces/payment-casso.interface");
const { axiosClient } = require("../utils/api-casso-payment");
const { paymentCassoService } = require("../services/payment-casso.service");

class PaymentCassoController extends IPaymentCasso {
    async getAll(req, res) {
        await handleRequest(req, res, async () => {
            return await paymentCassoService.getAll();
        })
    }

    async getDetailUser(req, res) {
        await handleRequest(req, res, async () => {
            let data = await axiosClient.get(`/userInfo`);
            return res.status(200).json({
                message: "Success",
                data: data,
            })
        })
    }

    async createPayment(req, res) {
        await handleRequest(req, res, async () => {
            const result = await paymentCassoService.createPayment();

            return res.status(200).json({
                message: "Success",
                data: result,
            });
        })
    }

    async handlerBankTransfer(req, res) {
        await handleRequest(req, res, async () => {
            return await paymentCassoService.handlerBankTransfer();
        })
    }

    async handleUserPaid(req, res) {
        const result = await paymentCassoService.handleUserPaid();

        // if (result) {
            return res.status(200).json({
                message: "Success",
                data: result,
            });
        // }

        // return res.status(400).json({
        //     message: "Nothing to update",
        // });
    }

    async handleUpdateBalance(req, res) {
        await handleRequest(req, res, async () => {
            return await paymentCassoService.handleUpdateBalance();
        })
    }

    async handleCreateWebhook(req, res) {
        await handleRequest(req, res, async () => {
            return res.status(200).json({
                message: "Success",
            });
        })
    }
}

const paymentCassoController = new PaymentCassoController();

module.exports = {
    paymentCassoController,
};
