const { formula } = require("../lib/formula");
const { adsAnalyticsRepository } = require("../repositories/ads-analytics.repository")

class AdsAnalyticsService {
    async updateDailyAnalytics() {
        const ads = await adsAnalyticsRepository.findAllAds();
        const today = new Date();

        for (const ad of ads) {
            if (ad.schedule_start <= today && (ad.schedule_end ? today <= ad.schedule_end : true)) {
                const impressions = this.calculateImpressions();
                const clicks = this.calculateClicks();
                const conversions = this.calculateConversions();
                const ctr = formula.calculateCTR(clicks, impressions);

                ad.result.push({
                    date: today,
                    impressions,
                    clicks,
                    conversions,
                    ctr
                });

                await ad.save();
            }
        }
    }

    calculateImpressions() {
        return Math.floor(Math.random() * 1000); // Replace with actual logic
    }

    calculateClicks() {
        return Math.floor(Math.random() * 100); // Replace with actual logic
    }

    calculateConversions() {
        return Math.floor(Math.random() * 10); // Replace with actual logic
    }
}

const adsAnalyticsService = new AdsAnalyticsService()

module.exports = { adsAnalyticsService };
