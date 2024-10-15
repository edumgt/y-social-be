const { default: axios } = require('axios');
const { GG_APP_SCRIPT_API_KEY } = require('../constants/payment');
const { IPaymentCasso } = require('./interfaces/payment-casso.interface');
const { extractUserIdFromTransaction } = require('../lib/extract-user-id-from-transaction');
const { userService } = require('../services/user.service');
const PaymentModel = require("../models/payment.model");

class PaymentCassoRepository extends IPaymentCasso {
    async getAll() {
        try {
            return await PaymentModel.find();
        } catch (error) {
            console.error('Error getting all payments: ', error.message);
            throw error;
        }
    }

    async createPayment(data) {
        try {
            const payment = new PaymentModel(data);
            return await payment.save();
        } catch (error) {
            console.error('Error creating new payment:', error.message);
            throw error;
        }
    }

    async handlerBankTransfer() {
        try {
            const result = await axios.get(GG_APP_SCRIPT_API_KEY)
            const { data } = result;
            const paymentList = data.data;
            return paymentList;
        } catch (error) {
            console.error('Error sync new transaction:', error.message);
            throw error;
        }
    }

    async handleUserPaid(paymentList) {
        try {
            paymentList.map(async (payment) => {
                // This collumn is specific by Casso Auto Bot
                // Visit: https://www.casso.vn/ to learn more
                const {
                    "Ngày diễn ra": when,
                    "Số tài khoản": bankSubAccId,
                    "Giá trị": amount,
                    "Mã GD": transactionId,
                    "Mô tả": description,
                } = payment;

                const userID = extractUserIdFromTransaction(description)
                const checkPaymentIsExisting = await PaymentModel.findOne({
                    transactionId,
                });

                if(userID && !checkPaymentIsExisting) {
                    const user = await userService.findUserById(userID)
                    
                    if(user) {
                        const result = await this.createPayment({
                            userID,
                            bankSubAccId,
                            amount,
                            transactionId,
                            description,
                            when,
                        })

                        await userService.updateBalance(userID, result._id, amount)

                        return result;
                    }
                }
            })
        } catch (error) {
            console.error('Error creating new user paid:', error.message);
            throw error;
        }
    }

    async handleUpdateBalance() {
        return 1;
    }
}

const paymentCassoRepository = new PaymentCassoRepository();

module.exports = { paymentCassoRepository };
