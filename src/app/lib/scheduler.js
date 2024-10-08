const cron = require('node-cron');
const { adsAnalyticsService } = require('../services/ads-analytics.service');
const RUN_PER_DAY = '0 0 * * *';

cron.schedule(RUN_PER_DAY, async () => {
    try {
        await adsAnalyticsService.updateDailyAnalytics();
        console.log('Daily analytics updated successfully.');
    } catch (error) {
        console.error('Error updating daily analytics:', error);
    }
});
