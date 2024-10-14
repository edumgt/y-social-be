const { STRATEGY } = require('../constants/ads');
const { IAds } = require('./interfaces/ads.interface');
const AdModel = require('../models/ads.model');
const { ERRORS_ADS_REPOSITORY } = require('./constants/error');
const { formula } = require("../lib/formula");

class AdsRepository extends IAds {
    async create(adData) {
        try {
            const ad = new AdModel(adData);
            return await ad.save();
        } catch (error) {
            console.error('Error creating ad:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await AdModel.findById(id).exec();
        } catch (error) {
            console.error('Error finding ad by ID:', error.message);
            throw error;
        }
    }

    async update(id, adData) {
        try {
            return await AdModel.findByIdAndUpdate(id, adData, { new: true }).exec();
        } catch (error) {
            console.error('Error updating ad:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await AdModel.findByIdAndDelete(id).exec();
        } catch (error) {
            console.error('Error deleting ad:', error.message);
            throw error;
        }
    }

    async findAll(limit, skip) {
        try {
            if(limit || skip) {
                return await AdModel.find().limit(limit).skip(skip).exec();
            }
            return await AdModel.find().exec();
        } catch (error) {
            console.error('Error finding all ads:', error.message);
            throw error;
        }
    }

    async findByUser(userId) {
        try {
            return await AdModel.find({ userID: userId }).exec();
        } catch (error) {
            console.error('Error finding ads by user ID:', error.message);
            throw error;
        }
    }

    async deleteAllByUser(userId) {
        try {
            return await AdModel.deleteMany({ userID: userId }).exec();
        } catch (error) {
            console.error('Error deleting all ads by user ID:', error.message);
            throw error;
        }
    }

    async calculateAdsScore(ad) {
        const { result, _id } = ad;
        const { impressions, clicks, conversions } = result;

        // Await asynchronous methods
        const totalInteractions = await formula.calculateTotalInteractions(_id);
        const totalCost = await formula.calculateTotalCost(_id);
        const scores = formula.calculateTrendingScore(clicks, impressions, conversions, totalCost, totalInteractions);

        return scores / STRATEGY.TRENDING; // Average score
    }

    async findTrending() {
        try {
            const adList = await AdModel.find({}).sort({ createdAt: -1 }).limit(10).exec();

            const adsWithScores = [];
            for (const ad of adList) {
                const score = await this.calculateAdsScore(ad);
                adsWithScores.push({
                    ...ad.toObject(),
                    score
                });
                console.log(score);
            }

            // Sort ads by score in descending order
            adsWithScores.sort((a, b) => b.score - a.score);

            return adsWithScores;
        } catch (error) {
            console.error(ERRORS_ADS_REPOSITORY.TRENDING_ADS, error.message);
            throw error;
        }
    }
}

const adsRepository = new AdsRepository();

module.exports = { adsRepository };
