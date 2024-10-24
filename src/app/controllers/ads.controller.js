const { ERRORS } = require("../constants/error");
const { CurrencyConverter } = require("../lib/convert");
const { adsService } = require("../services/ads.service");
const { handleRequest } = require("../utils/handle-request");
const { default: rateLimit } = require("express-rate-limit");
const { userService } = require("../services/user.service");
const { ADS_STATUS } = require("../constants/ads");

const rateLimitImpressions = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1, // Limit each IP to 1 request per hour windows
  message: "Too many requests, please try again later",
  handler: (req, res) => {
    return res.status(204).send();
  }
});

const rateLimitClicks = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1, // Limit each IP to 1 clicks per hour
  message: "Too many requests, please try again later.",
  handler: (req, res) => {
    return res.status(204).send();
  }
});

class AdsController {
  async createAd(req, res) {
    await handleRequest(req, res, async () => {
      const { schedule_start, budget, userID } = req.body;
      const userBalance = await userService.checkBalance(userID)

      const adData = {
        userID,
        link_action: "https://i.pinimg.com/enabled_hi/564x/cd/aa/56/cdaa5630b421cb002ba19ce817e8e80c.jpg",
        ...req.body,
        schedule_start: schedule_start ? new Date(schedule_start) : new Date(),
      };

      // Compare schedule_start with the current date
      if (adData.schedule_start < new Date()) {
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

  async getAdByUser(req, res) {
    await handleRequest(req, res, async () => {
      const userId = req.params.userId;
      const ads = await adsService.getAdByUser(userId);
      if (!ads.length) {
        throw new Error(ERRORS.NOT_FOUND);
      }
      return ads;
    });
  }

  async deleteAllAdByUser(req, res) {
    await handleRequest(req, res, async () => {
      const userId = req.params.userId;
      return await adsService.deleteAllAdByUser(userId);
    });
  }

  async getAdByTrend(req, res) {
    await handleRequest(req, res, async () => {
      return await adsService.getAdByTrend();
    });
  }

  async getSchedulingAdvertise(req, res) {
    await handleRequest(req, res, async () => {
      const result = await adsService.getSchedulingAdvertise();
      return result;
    });
  }

  async handleImpression(req, res) {
    rateLimitImpressions(req, res, async (err) => {
        if(!err) {
          await handleRequest(req, res, async () => {
          const adId = req.params.id;
          return await adsService.handleImpressions(adId);
        });
      }
    })
  }

  async handleClicks(req, res) {
    rateLimitClicks(req, res, async (err) => {
      if(!err) {
        await handleRequest(req, res, async () => {
          const adId = req.params.id;
          return await adsService.handleClicks(adId);
        })
      }
    });
  }

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
