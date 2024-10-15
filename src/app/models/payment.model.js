/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const Payment = new Schema(
  {
    userID: {
      type: String,
      ref: "user",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bankSubAccId: {
      type: String,
      required: true,
    },
    when: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const paymentModel = mongoose.model("payment", Payment);

module.exports = paymentModel;
