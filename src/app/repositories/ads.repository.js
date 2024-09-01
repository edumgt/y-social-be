const { IAds } = require('../interfaces/ads.interface');
const AdModel = require('../models/ads.model');

class AdsRepository extends IAds {
    // Create a new ad
    async create(adData) {
        try {
            const ad = new AdModel(adData);
            return await ad.save();
        } catch (error) {
            console.error('Error creating ad:', error.message);
            throw error;
        }
    }

    // Find an ad by ID
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

    // Delete an ad by ID
    async delete(id) {
        try {
            return await AdModel.findByIdAndDelete(id).exec();
        } catch (error) {
            console.error('Error deleting ad:', error.message);
            throw error;
        }
    }

    // Find all ads
    async findAll() {
        try {
            return await AdModel.find().exec();
        } catch (error) {
            console.error('Error finding all ads:', error.message);
            throw error;
        }
    }

    // Find all ads by a specific user
    async findByUser(userId) {
        try {
            return await AdModel.find({ userID: userId }).exec();
        } catch (error) {
            console.error('Error finding ads by user ID:', error.message);
            throw error;
        }
    }

    // Delete all ads by a specific user
    async deleteAllByUser(userId) {
        try {
            return await AdModel.deleteMany({ userID: userId }).exec();
        } catch (error) {
            console.error('Error deleting all ads by user ID:', error.message);
            throw error;
        }
    }

    // Find trending ads (Example logic, modify as needed)
    async findTrending() {
        try {
            // Example logic: Find the most recent 10 ads
            return await AdModel.find().sort({ createdAt: -1 }).limit(10).exec();
        } catch (error) {
            console.error('Error finding trending ads:', error.message);
            throw error;
        }
    }
}

const adsRepository = new AdsRepository();

module.exports = { adsRepository };
