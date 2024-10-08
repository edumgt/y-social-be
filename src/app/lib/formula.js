// example usage

const { IFormula } = require("../interfaces/formula.interface");
const AdModel = require("../models/ads.model");

// const clicks = 500;
// const impressions = 10000;
// const conversions = 50;
// const totalCost = 1000;
// const totalInteractions = 600;

// const ctr = calculateCTR(clicks, impressions);
// const conversionRate = calculateConversionRate(conversions, clicks);
// const cpa = calculateCPA(totalCost, conversions);
// const engagementRate = calculateEngagementRate(totalInteractions, impressions);

class Formula extends IFormula {
    calculateCTR(clicks, impressions) {
        return impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
    }

    async calculateTotalCost(adId) {
        try {
            const ad = await AdModel.findById(adId).exec();
            if (!ad) {
                throw new Error('Ad not found');
            }
            return ad.result.reduce((sum, analytics) => sum + (analytics.cost || 0), 0);
        } catch (error) {
            console.error('Error calculating total cost:', error.message);
            throw error;
        }
    }

    calculateConversionRate(conversions, clicks) {
        return clicks ? (conversions / clicks) * 100 : 0;
    }

    async calculateTotalInteractions(adId) {
        try {
            const ad = await AdModel.findById(adId).exec();

            if (!ad) {
                throw new Error(ERRORS.NOT_FOUND);
            }
            const totalInteractions = ad.result.reduce((total, analytics) => {
                return total + (analytics.clicks || 0);
            }, 0);
            return totalInteractions;
        } catch (error) {
            console.error('Error calculating total interactions:', error.message);
            throw error;
        }
    }

    calculateCPA(totalCost, conversions) {
        return conversions ? totalCost / conversions : 0;
    }

    calculateEngagementRate(totalInteractions, impressions) {
        return impressions ? (totalInteractions / impressions) * 100 : 0;
    }

    calculateTrendingScore(clicks, impressions, conversions, totalCost, totalInteractions) {
        const ctr = this.calculateCTR(clicks, impressions);
        const conversionRate = this.calculateConversionRate(conversions, clicks);
        const cpa = this.calculateCPA(totalCost, conversions);
        const engagementRate = this.calculateEngagementRate(totalInteractions, impressions);

        // Normalize the scores to make them comparable
        const normalizedCTR = ctr / 100;
        const normalizedConversionRate = conversionRate / 100;
        const normalizedEngagementRate = engagementRate / 100;

        // Inverse CPA to make it a higher score for lower costs
        const normalizedCPA = 1 / (cpa + 1); // Adding 1 to avoid division by zero and smooth the curve

        // Combine the metrics into a single score
        const trendingScore = (normalizedCTR + normalizedConversionRate + normalizedEngagementRate + normalizedCPA) / 4;
        console.log(`CTR: ${ctr}%`);
        console.log(`Conversion Rate: ${conversionRate}%`);
        console.log(`CPA: $${cpa}`);
        console.log(`Engagement Rate: ${engagementRate}%`);
        console.log(`Trending Score: ${trendingScore}`);
        return trendingScore;
    }
}

const formula = new Formula()

module.exports = { formula }
