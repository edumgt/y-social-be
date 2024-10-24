const cron = require("node-cron");
const ColorConsole = require("../color-console");
const { adsService } = require("../../services/ads.service");
const RUN_EVERY_1_MINUTE = "*/1 * * * *";

const scheduleSyncNewPayment = cron.schedule(RUN_EVERY_1_MINUTE, async () => {
    try {
        ColorConsole.info(`Bắt đầu kiểm tra ngân sách người dùng...`);
        await adsService.isBalanceSufficientForDailyBudget();
        ColorConsole.success(`Đã kiểm tra ngân sách người dùng.    `);
    } catch (err) {
        ColorConsole.error(`Kiểm tra ngân sách người dùng không thành công: ${err}`);
    }
});

module.exports = scheduleSyncNewPayment;
