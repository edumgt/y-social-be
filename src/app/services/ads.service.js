const { adsRepository } = require("../repositories/ads.repository");

class AdsService {
    async addDailyAnalytics(adId, date, impressions, clicks, conversions) {
        const ad = await adsRepository.findById(adId);
        if (!ad) {
            throw new Error('Ad not found');
        }

        ad.result.push({
            date: new Date(date),
            impressions,
            clicks,
            conversions,
        });

        await ad.save();
        return ad; // Optional: return the updated ad
    }

    // Create a new ad
    async createAd(data) {
        try {
            // Example of additional business logic (e.g., ensuring budget is within a certain range)
            if (data.budget < 0) {
                throw new Error('Budget must be a positive number');
            }

            // Interact with the repository to create the ad
            return await adsRepository.create(data);
        } catch (error) {
            console.error('Error creating ad:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Get an ad by ID
    async getAdById(id) {
        try {
            const ad = await adsRepository.findById(id);
            if (!ad) {
                throw new Error('Ad not found');
            }
            return ad;
        } catch (error) {
            console.error('Error fetching ad:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Update an ad by ID
    async updateAd(id, data) {
        try {
            const updatedAd = await adsRepository.update(id, data);
            if (!updatedAd) {
                throw new Error('Ad not found');
            }
            return updatedAd;
        } catch (error) {
            console.error('Error updating ad:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Delete an ad by ID
    async deleteAd(id) {
        try {
            const ad = await adsRepository.findById(id);
            if (!ad) {
                throw new Error('Ad not found');
            }
            await adsRepository.delete(id);
            return { message: 'Ad deleted successfully' };
        } catch (error) {
            console.error('Error deleting ad:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Get all ads
    async getAllAds() {
        try {
            return await adsRepository.findAll();
        } catch (error) {
            console.error('Error fetching all ads:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Get all ads by a specific user
    async getAdByUser(userId) {
        try {
            const ads = await adsRepository.findByUser(userId);
            if (!ads.length) {
                throw new Error('No ads found for this user');
            }
            return ads;
        } catch (error) {
            console.error('Error fetching ads for user:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Delete all ads by a specific user
    async deleteAllAdByUser(userId) {
        try {
            const ads = await adsRepository.findByUser(userId);
            if (!ads.length) {
                throw new Error('No ads found for this user');
            }
            await adsRepository.deleteAllByUser(userId);
            return { message: 'All ads for the user deleted successfully' };
        } catch (error) {
            console.error('Error deleting ads for user:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }

    // Get trending ads
    async getAdByTrend() {
        try {
            // Example of additional business logic (e.g., determining what qualifies as trending)
            return await adsRepository.findTrending();
        } catch (error) {
            console.error('Error fetching trending ads:', error.message);
            throw error; // Propagate the error to be caught by the controller
        }
    }
}

const adsService = new AdsService(adsRepository);

module.exports = { adsService };
