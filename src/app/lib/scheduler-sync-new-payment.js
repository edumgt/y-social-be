const cron = require("node-cron");
const { paymentCassoService } = require("../services/payment-casso.service");
const ColorConsole = require("./color-console");
const { formatDateTime } = require("../utils/format-date");
const RUN_EVERY_1_MINUTE = "*/1 * * * *";

cron.schedule(RUN_EVERY_1_MINUTE, async () => {
  try {
    ColorConsole("info", `Bắt đầu kiểm tra giao dịch mới...              ${formatDateTime(new Date())}`);
    await paymentCassoService.handleUserPaid();
    ColorConsole("success", `Đã kiểm tra và cập nhật số dư người dùng.   ${formatDateTime(new Date())}`);
  } catch (err) {
    ColorConsole("error", `Error schedule sync new transfer: ${err}      ${formatDateTime(new Date())}`);
  }
});
