const { ERRORS } = require("../constants/error");
const { IFormula } = require("../interfaces/formula.interface");
const AdModel = require("../models/ads.model");
const { adsService } = require("../services/ads.service");
const ColorConsole = require("./color-console");

class Formula extends IFormula {
  async calculateTotalCost(adId) {
    try {
      const ad = await adsService.getAdById(adId);
      if (!ad) {
        throw new Error("Ad not found");
      }
      const result = ad.result.reduce((sum, analytics) => {
        const cost = Number(analytics.cost);
        return sum + (isNaN(cost) ? 0 : cost);
      }, 0);

      return result;
    } catch (error) {
      ColorConsole.error("Error calculating total cost: ", error.message);
      throw error;
    }
  }

  // cost per day
  async calculateCost(impressions, clicks, budget) {
    try {
      const costPerThousandImpressions = this.calculateCPM(budget, impressions) ;
      const costPerClick = this.calculateCPC(budget, clicks) 
      const costFromImpressions = this.calculateCFI(clicks, impressions, costPerThousandImpressions);
      const costFromClicks = this.calculateCostFromClicks(clicks, costPerClick);;
      const totalCTR = this.calculateCTR(clicks, impressions);
      const totalCost = this.calculateTotalCostPerDay(costFromImpressions, costFromClicks);;
      const costPerView = this.calculateCPV(totalCost, impressions);

      return {
        costPerThousandImpressions,
        costPerClick,
        costFromImpressions,
        costFromClicks,
        totalCost,
        totalCTR,
        costPerView
      };
    } catch (error) {
      console.error("Error calculating cost:", error.message);
      throw error;
    }
  }

  calculateDiscountCostAdvertise(budget, score) {
    try {
        if(score <= 0) return 0;

        const MAX_DISCOUNT = 0.3;
        const discountPercentage = Math.min((score / 100) * MAX_DISCOUNT, MAX_DISCOUNT).toFixed(3);
        const discountAmount = budget * discountPercentage;
        const finalCost = budget - discountAmount;

        return finalCost;
    } catch (error) {
        console.error("Error calculating discount:", error.message);
        throw error;
    }
  }

  // this calculate for cost per day
  calculateTotalCostPerDay(costFromImpressions, costFromClicks) {
    const result = costFromImpressions + costFromClicks;
    return result;
  }

  // This calculate for cost from total clicks not like cost per clicks
  // Why diff: cost per clicks just calculate for each click
  calculateCostFromClicks(clicks, cpc) {
    if(clicks < 0) return 0;
    const result = clicks * cpc;
    return result;
  }

  // cost from impression
  calculateCFI(clicks, impressions, costPerThousandImpressions) {
    if (clicks < 0 && impressions < 0) return 0;
    const result = Math.round((impressions * costPerThousandImpressions) / 1000);
    return result;
  }

  // CPV matters because it helps you gauge the efficiency of your ad spend and 
  // compare different campaigns or platforms. 
  // It's one way to determine you're not just throwing money into the void 
  // you're measuring exactly what you're getting for each dollar spent.
  // Also, CPV is a window into how well your content resonates with your audience. 
  // If people watch your ads without skipping, 
  // you're likely onto something good. 
  // A low CPV often means your content is hitting the mark, 
  // while a high one might signal it's time to shake things up.
  // visit: https://adcalculators.com/cost-per-view-cpv-calculator/ to know more
  calculateCPV(totalAdSpent, totalImpressions) {
    if(totalImpressions <= 0) return 0;
    const result = Math.round(totalAdSpent / totalImpressions);
    return result;
  }

  // Click-through rate (CTR) tells you the percentage of time an ad or 
  // piece of content gets clicked vs. 
  // how many times it's been seen.
  // An ad with 50 clicks and 1,000 impressions 
  // would have a 5% CTR.
  // CTR matters for your marketing. 
  // A high CTR means people are engaging with your ads and content. 
  // Low CTR? Your content isn't resonating with your audience and 
  // you may need to adjust it.
  calculateCTR(clicks, impressions) {
    if (impressions <= 0) return 0;
    const result = ((clicks / impressions) * 100).toFixed(2);
    return result;
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
      console.error("Error calculating total interactions:", error.message);
      throw error;
    }
  }

  // CPM stands for Cost per Mille, which means cost per 1,000 impressions.
  // Many major digital advertising platform charge advertisers like you by the impression. 
  // Every impression (unique time a user sees your ad) costs you money on these platforms. 
  // Examples of platforms that charge by the impression or 1,000 impressions
  // In general, lower CPM's are better than higher CPM's. 
  // BUT, in general most advertisers would not advise you to try and decrease your CPM at all costs. 
  // Why? Because one way to decrease CPMs is expanding your audience. 
  // Yet, you don't ever want to expand your audience so much 
  // that you advertise to people who don't fit in your ICP's (Ideal Customer Profiles).
  calculateCPM(budget, impressions) {
    if(impressions < 0) return 0;
    const result = Math.round(budget / (impressions / 1000));
    return result;
  }

  // Cost per click (CPC) is the amount of money you pay for 1 click in your ad campaign.
  // CPC's can vary widely between advertising platforms. 
  // For example, LinkedIn Ads tend to be more expensive and 
  // have higher CPC's than Facebook and Instagram Ads.
  // CPC's can also vary widely between campaigns. 
  // One campaign—targeted at a broader audience—could have a much lower CPC than 
  // a different campaign targeted at a niche audience.
  // visit: https://adcalculators.com/cpc-cost-per-click-calculator/ to know more
  calculateCPC(budget, totalClicks) {
    if (totalClicks <= 0) return 0;
    const result = Math.round(budget / totalClicks);
    return result;
  }

  // The purpose of calculating the CPA is to determine the average cost of acquiring 
  // a single conversion or customer. It is a metric used in digital advertising campaigns 
  // to evaluate the effectiveness and efficiency of marketing efforts. 
  // A lower CPA indicates that the cost of acquiring customers is lower, 
  // which is generally desirable for advertisers.
  calculateCPA(totalCost, conversions) {
    return conversions ? totalCost / conversions : 0;
  }

  calculateEngagementRate(totalInteractions, impressions) {
    if (impressions <= 0) return 0;
    const result = ((totalInteractions / impressions) * 100).toFixed(2)
    return result;
  }

  async calculateAdvertiseScore(ctr, totalCost, adId, impressions) {
    const totalInteractions = await this.calculateTotalInteractions(adId);
    const engagementRate = this.calculateEngagementRate(totalInteractions, impressions || 1);
    const score = 
        ((Math.min(ctr, 100) + Math.min(engagementRate, 100)) / 3).toFixed(2);
    // Ensure score is between 0 and 100
    const limitScore = Math.min(Math.max(score, 0), 100);

    return limitScore;
  }
}

const formula = new Formula();

module.exports = { formula };
