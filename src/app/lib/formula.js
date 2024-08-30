// example usage

// const clicks = 500;
// const impressions = 10000;
// const conversions = 50;
// const totalCost = 1000;
// const totalInteractions = 600;

// const ctr = calculateCTR(clicks, impressions);
// const conversionRate = calculateConversionRate(conversions, clicks);
// const cpa = calculateCPA(totalCost, conversions);
// const engagementRate = calculateEngagementRate(totalInteractions, impressions);

class Formula {
    static calculateCTR = (clicks, impressions) => {
        return impressions ? (clicks / impressions) * 100 : 0;
    }

    static calculateConversionRate = (conversions, clicks) => {
        return clicks ? (conversions / clicks) * 100 : 0;
    }

    static calculateCPA = (totalCost, conversions) => {
        return conversions ? totalCost / conversions : 0;
    }

    static calculateEngagementRate = (totalInteractions, impressions) => {
        return impressions ? (totalInteractions / impressions) * 100 : 0;
    }
}

const formula = new Formula()

module.exports = formula
