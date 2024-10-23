const cron = require("node-cron");
const { adsAnalyticsService } = require("../../services/ads-analytics.service");
const RUN_EVERY_1_MINUTE = "*/1 * * * *";
const ColorConsole = require("../color-console");

const schedulerUpdateAdvertiseAnaylytics = cron.schedule(RUN_EVERY_1_MINUTE, async () => {
  try {
    ColorConsole.info("Bắt đầu cập nhật kết quả cho các quảng cáo...");
    await adsAnalyticsService.updateDailyAnalytics();
    ColorConsole.success("Đã Cập nhật kết quả cho các quảng cáo");
  } catch (error) {
    ColorConsole.error("Lỗi cập nhật kết quả cho các quảng cáo: ", error);
  }
});

module.exports = schedulerUpdateAdvertiseAnaylytics;

