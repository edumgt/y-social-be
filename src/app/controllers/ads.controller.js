const { adsService } = require('../services/ads.service');
const { handleRequest } = require('../utils/handle-request');

class AdsController {
    async createAd(req, res) {
        await handleRequest(req, res, async () => {
            const adData = {
                userID: req.userId,
                ...req.body
            };

            // Set schedule_start to today's date if not provided
            if (!adData.schedule_start) {
                adData.schedule_start = new Date();
            }

            // Initialize result with today's date
            adData.result = [{
                date: new Date(),
                impressions: 0,
                clicks: 0,
                conversions: 0
            }];

            return await adsService.createAd(adData);
        });
    }


    // Update an existing ad
    async updateAd(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const updatedAd = await adsService.updateAd(adId, req.body);
            if (!updatedAd) {
                throw new Error('Ad not found');
            }
            return updatedAd;
        });
    }

    // Delete an ad by ID
    async deleteAd(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const result = await adsService.deleteAd(adId);
            if (result.error) {
                throw new Error('Ad not found');
            }
            return { message: 'Ad deleted successfully' };
        });
    }

    // Get all ads
    async getAllAds(req, res) {
        await handleRequest(req, res, async () => {
            return await adsService.getAllAds();
        });
    }

    // Get a single ad by ID
    async getAdById(req, res) {
        await handleRequest(req, res, async () => {
            const adId = req.params.id;
            const ad = await adsService.getAdById(adId);
            if (!ad) {
                throw new Error('Ad not found');
            }
            return ad;
        });
    }

    // Get all ads by a specific user
    async getAdByUser(req, res) {
        await handleRequest(req, res, async () => {
            const userId = req.params.userId;
            const ads = await adsService.getAdByUser(userId);
            if (!ads.length) {
                throw new Error('No ads found for this user');
            }
            return ads;
        });
    }

    // Delete all ads by a specific user
    async deleteAllAdByUser(req, res) {
        await handleRequest(req, res, async () => {
            const userId = req.params.userId;
            await adsService.deleteAllAdByUser(userId);
            return { message: 'All ads for the user deleted successfully' };
        });
    }

    // Get trending ads
    async getAdByTrend(req, res) {
        await handleRequest(req, res, async () => {
            return await adsService.getAdByTrend();
        });
    }
}

const adsController = new AdsController();

module.exports = { adsController };
