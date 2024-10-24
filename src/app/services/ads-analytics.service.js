const {
  adsAnalyticsRepository,
} = require("../repositories/ads-analytics.repository");
const { userService } = require("./user.service");

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
        const user = await userService.findUserById(ad.userID);
        user.balance -= ad.cost;
      }
    }
  }
}

const adsAnalyticsService = new AdsAnalyticsService();

module.exports = { adsAnalyticsService };
