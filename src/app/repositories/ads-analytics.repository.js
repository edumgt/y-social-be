const { IAdsAnalytics } = require("../interfaces/ads-analytics.interface");
const AdsModel = require("../models/ads.model");

class AdsAnalyticsRepository extends IAdsAnalytics {
  async findAllAds() {
    return await AdsModel.find({});
  }

  async saveAd(ad) {
    return await AdsModel.findByIdAndUpdate(ad._id, ad, { new: true });
  }
}

const adsAnalyticsRepository = new AdsAnalyticsRepository();

module.exports = { adsAnalyticsRepository };
