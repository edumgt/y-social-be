const express = require("express");
const { paymentController } = require("../controllers/payment.controller");
const { userMiddleware } = require("../middleware/user.middleware");
const router = express.Router();

router.get("/", paymentController.getAll);
router.get("/user/:userID", userMiddleware.validateUserById, paymentController.getPaymentByUserId);

module.exports = router;
