const { compare } = require("bcrypt");

const UserModel = require("../models/user.model");
const hashedUtil = require("../utils/hashed.util");
const { userRepository } = require("../repositories/user.repository");

class UserService {
  getAll = async () => {
    return await userRepository.getAll();
  };

  createUser = async (username, password, email) => {
    const hashedPassword = await hashedUtil.saltHash(password);

    const user = UserModel.create({
      username,
      password: hashedPassword,
      email,
    });

    return user;
  };

  checkPassword = async (user, password) => {
    return await compare(password, user.password);
  };

  findUserByUsername = async (username) => {
    const user = await UserModel.findOne({ username: username });
    return user;
  };

  findUserById = async (userId) => {
    const user = await UserModel.findById(userId);
    return user;
  };

  updateBalance = async (userId, paymentId, amount) => {
    return await userRepository.updateBalance(userId, paymentId, amount);
  };
}

const userService = new UserService();

module.exports = {
  userService,
};
