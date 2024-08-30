const cron = require('node-cron');
const { adsAnalyticsService } = require('../services/ads-analytics.service');

cron.schedule('0 0 * * *', async () => {
    try {
        await adsAnalyticsService.updateDailyAnalytics();
        console.log('Daily analytics updated successfully.');
    } catch (error) {
        console.error('Error updating daily analytics:', error);
    }
});
