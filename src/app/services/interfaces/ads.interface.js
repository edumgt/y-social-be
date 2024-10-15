const { ERRORS } = require("../constants/error");

class IAdsService {
  async addDailyAnalytics(adId, date, impressions, clicks, conversions) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: addDailyAnalytics(adId, date, impressions, clicks, conversions) method is not implemented.`,
      adId,
      date,
      impressions,
      clicks,
      conversions,
    );
  }

  async createAd(data) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: createAd(data) method is not implemented.`,
      data,
    );
  }

  async getAdById(id) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: getAdById(id) method is not implemented.`,
      id,
    );
  }

  async updateAd(id, data) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: updateAd(id, data) method is not implemented.`,
      id,
      data,
    );
  }

  async deleteAd(id) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: deleteAd(id) method is not implemented.`,
      id,
    );
  }

  async getAllAds() {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: getAllAds() method is not implemented.`,
    );
  }

  async getAdByUser(userId) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: getAdByUser(userId) method is not implemented.`,
      userId,
    );
  }

  async deleteAllAdByUser(userId) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: deleteAllAdByUser(userId) method is not implemented.`,
      userId,
    );
  }

  async getAdByTrend() {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: getAdByTrend() method is not implemented.`,
    );
  }
}

module.exports = { IAdsService };
