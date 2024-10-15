const { formula } = require("../lib/formula");
const {
  adsAnalyticsRepository,
} = require("../repositories/ads-analytics.repository");

class AdsAnalyticsService {
  async updateDailyAnalytics() {
    const ads = await adsAnalyticsRepository.findAllAds();
    const today = new Date();

    for (const ad of ads) {
      // ad.schedule_start <= today
      // which checks if the start date of the ad's schedule
      // is less than or equal to the current date (today).
      // (ad.schedule_end ? today <= ad.schedule_end : true).
      // It uses a ternary operator (? :) to check
      // if the ad has an end date specified.
      // If ad.schedule_end exists, it evaluates today <= ad.schedule_end
      // which checks if the current date is less than or equal to the end date.
      // If ad.schedule_end does not exist, it defaults to true.
      // If both conditions are true,
      // the code inside the if statement will be executed.
      if (
        ad.schedule_start <= today &&
        (ad.schedule_end ? today <= ad.schedule_end : true)
      ) {
        const impressions = this.calculateImpressions();
        const clicks = this.calculateClicks();
        const conversions = this.calculateConversions();
        const ctr = formula.calculateCTR(clicks, impressions);
        const cost = (impressions * ctr * conversions * ad.budget) / 100;

        ad.result.push({
          date: today,
          impressions,
          clicks,
          conversions,
          ctr,
          cost,
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

const adsAnalyticsService = new AdsAnalyticsService();

module.exports = { adsAnalyticsService };
