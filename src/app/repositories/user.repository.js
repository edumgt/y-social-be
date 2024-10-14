const userModel = require("../models/user.model");

class UserRepository {
    async getAll() {
        try {
            return await userModel.find();
        } catch (error) {
            console.error('Error getting all user:', error.message);
            throw error;
        }
    }

    async updateBalance(userId, paymentId, amount) {
        const user = await userModel.findById(userId);
        // add logic update balance
        if (!user.paymentList.includes(paymentId)) {
            await userModel.updateOne(
                { _id: userId },
                {
                    $inc: { balance: amount },
                    $push: { paymentList: paymentId },
                }
            );
            return await user.save();
        }

        return user;
    }
}

const userRepository = new UserRepository();

module.exports = { userRepository };
