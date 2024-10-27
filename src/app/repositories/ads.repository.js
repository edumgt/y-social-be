const { STRATEGY, ADS_STATUS } = require("../constants/ads");
const { IAds } = require("./interfaces/ads.interface");
const AdModel = require("../models/ads.model");
const { ERRORS_ADS_REPOSITORY } = require("./constants/error");
const { formula } = require("../lib/formula");
const { userService } = require("../services/user.service");
const adModel = require("../models/ads.model");

class AdsRepository extends IAds {
  async create(adData) {
    try {
      const ad = new AdModel(adData);
      return await ad.save();
    } catch (error) {
      console.error("Error creating ad:", error.message);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await AdModel.findById(id).exec();
    } catch (error) {
      console.error("Error finding ad by ID:", error.message);
      throw error;
    }
  }

  async update(id, adData) {
    try {
      return await AdModel.findByIdAndUpdate(
        id,
        { $set: adData },
        { new: true },
      ).exec();
    } catch (error) {
      console.error("Error updating ad:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await AdModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error("Error deleting ad:", error.message);
      throw error;
    }
  }

  async findAll(limit, skip) {
    try {
      if (limit || skip) {
        return await AdModel.find().limit(limit).skip(skip).exec();
      }
      return await AdModel.find().exec();
    } catch (error) {
      console.error("Error finding all ads:", error.message);
      throw error;
    }
  }

  async findByUser(userId) {
    try {
      return await AdModel.find({ userID: userId }).exec();
    } catch (error) {
      console.error("Error finding ads by user ID:", error.message);
      throw error;
    }
  }

  async deleteAllByUser(userId) {
    try {
      return await AdModel.deleteMany({ userID: userId }).exec();
    } catch (error) {
      console.error("Error deleting all ads by user ID:", error.message);
      throw error;
    }
  }

  async calculateAdsScore(id) {
    const ad = await AdModel.findById(id).exec();
    const { result, _id } = ad;
    const { impressions, clicks, conversions } = result;

    // Await asynchronous methods
    const totalInteractions = await formula.calculateTotalInteractions(_id);
    const totalCost = await formula.calculateTotalCost(_id);
    const scores = formula.calculateTrendingScore(
      clicks,
      impressions,
      conversions,
      totalCost,
      totalInteractions,
    );

    return scores / STRATEGY.TRENDING; // Average score
  }

  async findTrending() {
    try {
      const adList = await AdModel.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();

      const adsWithScores = [];
      for (const ad of adList) {
        const score = await this.calculateAdsScore(ad);
        adsWithScores.push({
          ...ad.toObject(),
          score,
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

  async getSchedulingAdvertise() {
    try {
      const now = new Date();
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999); // End of the day

      const adList = await AdModel.find({
        schedule_start: { $gte: startOfDay, $lte: endOfDay }
      })
        .sort({ createdAt: -1 })
        .exec();

      if (now.getHours() === 0 && now.getMinutes() === 0) {
        // Update status of the ads
        for (const ad of adList) {
          const userBalance = await userService.checkBalance(ad.userID);

          if (userBalance < ad.budget) {
            ad.status = ADS_STATUS.SUSPENDED;
            ad.isEnoughBudget = false;
          } else {
            ad.status = ADS_STATUS.ACTIVE; // or whatever status you want to set
            ad.isEnoughBudget = true;
          }

          await ad.save(); // Save the updated ad
        }

        return adList; // Return the updated ad list if needed
      }

      return adList;
    } catch (error) {
      console.error(ERRORS_ADS_REPOSITORY.SCHEDULLING_ADS, error.message);
      throw error;
    }
  }

  async getDailyAnalytics(adId) {
    const ad = await AdModel.findById(adId);

    // Update the click count in the ad's result array for today
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // 2024-10-

    // Find today's analytics entry
    const dailyAnalytics = ad.result.find(
      (analytics) => analytics.date.toISOString().split('T')[0] === todayString
    );

    return dailyAnalytics;
  }

  async handleImpressions(adId) {
    const ad = await AdModel.findById(adId);
    const user = await userService.findUserById(ad.userID);

    // Update the click count in the ad's result array for today
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // 2024-10-25

    // Find today's analytics entry
    const dailyAnalytics = ad.result.find(
      (analytics) => analytics.date.toISOString().split('T')[0] === todayString
    );

    if (dailyAnalytics) {
      // Update the clicks if today's entry exists
      dailyAnalytics.impressions += 1;
      const { totalCost, totalCTR, costPerClick, costPerView, costPerThousandImpressions } = await formula.calculateCost(dailyAnalytics.impressions, dailyAnalytics.clicks, ad.budget)
      const score = await formula.calculateAdvertiseScore(totalCTR, totalCost, adId, dailyAnalytics.impressions);
      const discountCost = formula.calculateDiscountCostAdvertise(ad.budget, score);

      if (user.balance < discountCost) {
        ad.status = ADS_STATUS.SUSPENDED;
        ad.isEnoughBudget = false;
        await ad.save();
        return ad;
      }

      dailyAnalytics.cost = discountCost;
      dailyAnalytics.ctr = totalCTR;
      dailyAnalytics.cpc = costPerClick;
      dailyAnalytics.cpv = costPerView;
      dailyAnalytics.cpm = costPerThousandImpressions;
      ad.score = score;
    } else {
      // Create a new entry for today's date if it doesn't exist
      const newEntry = {
        date: today,
        impressions: 1,
      }
      const { totalCost, totalCTR, costPerClick, costPerView, costPerThousandImpressions } = await formula.calculateCost(newEntry.impressions, newEntry.clicks, ad.budget)
      const score = await formula.calculateAdvertiseScore(totalCTR, totalCost, adId, newEntry.impressions);
      const discountCost = formula.calculateDiscountCostAdvertise(ad.budget, score);

      newEntry.cost = discountCost;
      newEntry.ctr = totalCTR;
      newEntry.cpc = costPerClick;
      newEntry.cpv = costPerView;
      newEntry.cpm = costPerThousandImpressions;
      ad.score = score;

      ad.result.push(newEntry);
    }

    await ad.save(); // Save the updated ad document
    return ad;
  }

  async handleClicks(adId) {
    const ad = await AdModel.findById(adId);
    const user = await userService.findUserById(ad.userID);

    // Update the click count in the ad's result array for today
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // 2024-10-

    // Find today's analytics entry
    let dailyAnalytics = ad.result.find(
      (analytics) => analytics.date.toISOString().split('T')[0] === todayString
    );

    if (dailyAnalytics) {
      // Update the clicks if today's entry exists
      dailyAnalytics.clicks += 1;
      const { totalCost, totalCTR, costPerClick, costPerView, costPerThousandImpressions } = await formula.calculateCost(dailyAnalytics.impressions, dailyAnalytics.clicks, ad.budget)
      const score = await formula.calculateAdvertiseScore(totalCTR, totalCost, adId, dailyAnalytics.impressions);
      const discountCost = formula.calculateDiscountCostAdvertise(ad.budget, score);

      if (user.balance < discountCost) {
        ad.status = ADS_STATUS.SUSPENDED;
        ad.isEnoughBudget = false;
        await ad.save();
        return ad;
      }

      dailyAnalytics.cost = discountCost;
      dailyAnalytics.ctr = totalCTR;
      dailyAnalytics.cpc = costPerClick;
      dailyAnalytics.cpv = costPerView;
      dailyAnalytics.cpm = costPerThousandImpressions;
      ad.isEnoughBudget = true;
      ad.score = score;
      user.balance -= dailyAnalytics.cost;

      await user.save();
      await formula.calculateAdvertiseScore(totalCTR, totalCost, adId, dailyAnalytics.impressions)
    } else {
      const newEntry = {
        date: today,
        clicks: 1,
        impressions: 1,
      }
      const { totalCost, totalCTR, costPerClick, costPerView, costPerThousandImpressions } = await formula.calculateCost(newEntry.impressions, newEntry.clicks, ad.budget)
      const score = await formula.calculateAdvertiseScore(totalCTR, totalCost, adId, newEntry.impressions);
      const discountCost = formula.calculateDiscountCostAdvertise(ad.budget, score);

      newEntry.cost = discountCost;
      newEntry.ctr = totalCTR;
      newEntry.cpc = costPerClick;
      newEntry.cpv = costPerView;
      newEntry.cpm = costPerThousandImpressions;
      ad.score = score;

      ad.result.push(newEntry);
    }

    await ad.save(); // Save the updated ad document
    return ad;
  }

  async updateStatusAdvertiseByUserBalance(userInfo, adList) {
    const now = new Date();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const updates = adList.flatMap(ad => {
      // eslint-disable-next-line no-unused-vars
      return Array.from(userInfo.entries()).map(([userID, balance]) => {
        if (ad.userID === userID) {
          let status;
          const hasEnoughBudget = balance >= ad.budget;
          const isScheduled = ad.schedule_start > now;

          if (!hasEnoughBudget) {
            status = ADS_STATUS.SUSPENDED;
          } else {
            if (isScheduled) {
              status = ADS_STATUS.SCHEDULE;
            } else if(ad.schedule_start === now) {
              status = ADS_STATUS.ACTIVE;
            }
          }

          return status ? {
            id: ad.id,
            update: { status, isEnoughBudget: hasEnoughBudget }
          } : null;
        }

        return;
      });
    }).filter(Boolean); // Remove null entries

    // Execute all necessary updates to the database in one operation
    if (updates.length) {
      await AdModel.bulkWrite(
        updates.map(({ id, update }) => ({
          updateOne: { filter: { _id: id }, update: { $set: update } },
        }))
      );
    }
  }

  async isBalanceSufficientForDailyBudget() {
    const adList = await adModel.find({ status: { $ne: ADS_STATUS.DISABLED } });
    const userList = await userService.getAll();

    if (!userList.length || !adList.length) return;

    const userInfo = new Map(userList.map(user => [user.id, user.balance]));
    await this.updateStatusAdvertiseByUserBalance(userInfo, adList);
    return adList;
  }
}

const adsRepository = new AdsRepository();

module.exports = { adsRepository };
