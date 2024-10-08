const { ERRORS } = require('../constants/error');
const { CurrencyConverter } = require('../lib/convert');
const { adsService } = require('../services/ads.service');
const { handleRequest } = require('../utils/handle-request');

class AdsController {
    async createAd(req, res) {
        await handleRequest(req, res, async () => {
            const { schedule_start, ...body } = req.body;

            // Initialize adData
            const adData = {
                userID: req.userId,
                ...body,
                schedule_start: schedule_start ? new Date(schedule_start) : new Date(),
            };

            // Compare schedule_start with the current date
            if (adData.schedule_start < new Date()) {
                adData.status = 'schedule';
            }

            // Set schedule_start to today's date if not provided
            if (!adData.schedule_start) {
                adData.schedule_start = new Date();
            }

            const InitializeResult = [{
                date: new Date(),
                impressions: 0,
                clicks: 0,
                conversions: 0
            }]
            adData.result = InitializeResult;
            return await adsService.createAd(adData);
        });
    }

    async updateAd(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const ad = await adsService.getAdById(adId);
            const updateData = req.body;

            if (updateData.currency && ad.currency !== updateData.currency) {
                const convertedBudget = new CurrencyConverter().convert(ad.budget, ad.currency, updateData.currency);

                updateData.budget = convertedBudget;
                updateData.currency = updateData.currency;
            }

            const updatedAd = await adsService.updateAd(adId, updateData);
            if (!updatedAd) {
                throw new Error(ERRORS.DEFAULT);
            }
            return updatedAd;
        });
    }

    async deleteAd(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const result = await adsService.deleteAd(adId);
            if (result.error) {
                throw new Error(ERRORS.NOT_FOUND);
            }
            return { message: 'Ad deleted successfully' };
        });
    }

    async getAllAds(req, res) {
        await handleRequest(req, res, async () => {
            return await adsService.getAllAds();
        });
    }

    async getAdById(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const ad = await adsService.getAdById(adId);
            if (!ad) {
                throw new Error(ERRORS.NOT_FOUND);
            }
            return ad;
        });
    }

    async getAdByUser(req, res) {
        await handleRequest(req, res, async () => {
            const userId = req.params.userId;
            const ads = await adsService.getAdByUser(userId);
            if (!ads.length) {
                throw new Error(ERRORS.NOT_FOUND);
            }
            return ads;
        });
    }

    async deleteAllAdByUser(req, res) {
        await handleRequest(req, res, async () => {
            const userId = req.params.userId;
            return await adsService.deleteAllAdByUser(userId);
        });
    }

    async getAdByTrend(req, res) {
        await handleRequest(req, res, async () => {
            return await adsService.getAdByTrend();
        });
    }
}

const adsController = new AdsController();

module.exports = { adsController };

