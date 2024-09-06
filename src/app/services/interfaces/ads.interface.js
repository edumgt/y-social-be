const { ERRORS } = require("../constants/error");

class IAdsService {
    async addDailyAnalytics(adId, date, impressions, clicks, conversions) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: addDailyAnalytics(adId, date, impressions, clicks, conversions) method is not implemented.`);
    }

    async createAd(data) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: createAd(data) method is not implemented.`);
    }

    async getAdById(id) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: getAdById(id) method is not implemented.`);
    }

    async updateAd(id, data) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: updateAd(id, data) method is not implemented.`);
    }

    async deleteAd(id) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: deleteAd(id) method is not implemented.`);
    }

    async getAllAds() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: getAllAds() method is not implemented.`);
    }

    async getAdByUser(userId) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: getAdByUser(userId) method is not implemented.`);
    }

    async deleteAllAdByUser(userId) {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: deleteAllAdByUser(userId) method is not implemented.`);
    }

    async getAdByTrend() {
        throw new Error(`${ERRORS.NOT_IMPLEMENTED}: getAdByTrend() method is not implemented.`);
    }
}

module.exports = { IAdsService };
