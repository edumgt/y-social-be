const cron = require("node-cron");

// 0 - at the 0th minute
// 0 - at the 0th hour (midnight)
// * - every day of the month
// * - every month
// * - every day of the week

// const RUN_EVERY_MIDNIGHT = "0 0 * * *";
const RUN_EVERY_MIDNIGHT = "*/1 * * * *";
const ColorConsole = require("../color-console");
const { adsService } = require("../../services/ads.service");

const scheduleStartAdvertise = cron.schedule(RUN_EVERY_MIDNIGHT, async () => {
    try {
        ColorConsole.info(`Bắt đầu quét toàn bộ quảng cáo hôm nay...`);
        await adsService.getSchedulingAdvertise();
        ColorConsole.success(`Đã quét và cập nhật toàn bộ quảng cáo.`);
    } catch (error) {
        ColorConsole.error(`Lỗi quét toàn bộ quảng cáo: ${error}`);
    }
});

module.exports = scheduleStartAdvertise;
