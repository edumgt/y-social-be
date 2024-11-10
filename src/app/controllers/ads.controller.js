const { ERRORS } = require("../constants/error");
const { CurrencyConverter } = require("../lib/convert");
const { adsService } = require("../services/ads.service");
const { handleRequest } = require("../utils/handle-request");
const { userService } = require("../services/user.service");
const { ADS_STATUS } = require("../constants/ads");

class AdsController {
  async createAd(req, res) {
    await handleRequest(req, res, async () => {
      const { schedule_start, budget, userID } = req.body;
      const userBalance = await userService.checkBalance(userID)

      const adData = {
        userID,
        ...req.body,
        schedule_start: schedule_start ? new Date(schedule_start) : new Date(),
        status: ADS_STATUS.ACTIVE
      };

       // Set to SCHEDULE if start date is in the future
      if (adData.schedule_start > new Date()) {
        adData.status = ADS_STATUS.SCHEDULE;
      }

      if(userBalance < budget) {
        adData.status = ADS_STATUS.SUSPENDED;
        adData.isEnoughBudget = false;
      }

      // Set schedule_start to today's date if not provided
      if (!adData.schedule_start) {
        adData.schedule_start = new Date();
      }

      const InitializeResult = [
        {
          date: new Date(),
          impressions: 0,
          clicks: 0,
          conversions: 0,
        },
      ];
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
        const convertedBudget = new CurrencyConverter().convert(
          ad.budget,
          ad.currency,
          updateData.currency,
        );

        updateData.budget = convertedBudget;
        // eslint-disable-next-line no-self-assign
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
      return { message: "Ad deleted successfully" };
    });
  }

  async getAllAds(req, res) {
    await handleRequest(req, res, async () => {
      const { limit, skip } = req.query;

      return await adsService.getAllAds(limit, skip);
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

  /**
   * Retrieves the ads associated with the specified user.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.userId - The ID of the user whose ads should be retrieved.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The ads associated with the specified user.
   */
  async getAdByUser(req, res) {
    await handleRequest(req, res, async () => {
      const userId = req.params.userId;
      const ads = await adsService.getAdByUser(userId);
      if (!ads.length) {
        return [];
      }
      return ads;
    });
  }

  /**
   * Deletes all ads associated with the specified user.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.userId - The ID of the user whose ads should be deleted.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The result of the deletion operation.
   */
  async deleteAllAdByUser(req, res) {
    await handleRequest(req, res, async () => {
      const userId = req.params.userId;
      return await adsService.deleteAllAdByUser(userId);
    });
  }

  /**
   * Retrieves the ads that are currently trending.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The ads that are currently trending.
   */
  async getAdByTrend(req, res) {
    await handleRequest(req, res, async () => {
      return await adsService.getAdByTrend();
    });
  }

  /**
   * Retrieves the scheduling information for advertisements.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The scheduling information for advertisements.
   */
  async getSchedulingAdvertise(req, res) {
    await handleRequest(req, res, async () => {
      const result = await adsService.getSchedulingAdvertise();
      return result;
    });
  }

  /**
   * Handles the processing of ad impressions for a given ad ID.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} req.params.id - The ID of the ad for which to handle impressions.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The result of the impression handling operation.
   */
  async handleImpression(req, res) {
    await handleRequest(req, res, async () => {
      const adId = req.params.id;
      return await adsService.handleImpressions(adId);
    });
  }

  /**
   * Handles the processing of ad clicks for a given ad ID.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} req.params.id - The ID of the ad for which to handle clicks.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - The result of the click handling operation.
   */
  async handleClicks(req, res) {
    await handleRequest(req, res, async () => {
      const adId = req.params.id;
      return await adsService.handleClicks(adId);
    })
  }

  /**
   * Checks if the user's account balance is sufficient to cover the daily advertising budget.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<Object>} - An object containing a success message and the result of the balance check.
   */
  async isBalanceSufficientForDailyBudget(req, res) {
    handleRequest(req, res, async () => {
      const result = await adsService.isBalanceSufficientForDailyBudget();
      return res.status(200).json(
        {
          message: "Successfully",
          data: result
        }
      );
    })
  }
}

const adsController = new AdsController();

module.exports = { adsController };
