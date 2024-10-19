const express = require("express");
const {
  paymentCassoController,
} = require("../controllers/payment-casso.controller");
const { checkPermissions } = require("../lib/check-permission");
const router = express.Router();

router.use(checkPermissions);

router.get("/", paymentCassoController.getAll);
router.get("/user-info", paymentCassoController.getDetailUser);
router.post(
  "/webhook/handler-bank-transfer",
  paymentCassoController.handlerBankTransfer,
);

// Router này sẽ thực hiện tính năng đồng bộ giao dịch tức thì.
// Ví dụ: Khi người dùng chuyển khoản cho bạn và họ ấn nút tôi đã
// thanh toán thì nên xử lí gọi qua casso
// đề đồng bộ giao dịch vừa chuyển khoản
router.get("/users-paid", paymentCassoController.handleUserPaid);
router.post("/update-balance", paymentCassoController.handleUpdateBalance);

// Route này sẽ thực hiện đăng kí webhook dựa vào API KEY và lấy thông tin về business và banks
router.post("/register-webhook", paymentCassoController.handleCreateWebhook);

module.exports = router;
