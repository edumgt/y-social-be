const { ERRORS } = require("../constants/error");

class IFormula {
  calculateCTR(clicks, impressions) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateCTR(clicks, impressions) method is not implemented.`,
      clicks,
      impressions,
    );
  }

  calculateConversionRate(conversions, clicks) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateConversionRate(conversions, clicks) method is not implemented.`,
      conversions,
      clicks,
    );
  }

  calculateCPA(totalCost, conversions) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateCPA(totalCost, conversions) method is not implemented.`,
      totalCost,
      conversions,
    );
  }

  calculateEngagementRate(totalInteractions, impressions) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateEngagementRate(totalInteractions, impressions) method is not implemented.`,
      totalInteractions,
      impressions,
    );
  }

  calculateTrendingScore(
    clicks,
    impressions,
    conversions,
    totalCost,
    totalInteractions,
  ) {
    throw new Error(
      `${ERRORS.NOT_IMPLEMENTED}: calculateTrendingScore(clicks, impressions, conversions, totalCost, totalInteractions) method is not implemented.`,
      clicks,
      impressions,
      conversions,
      totalCost,
      totalInteractions,
    );
  }
}

module.exports = { IFormula };
