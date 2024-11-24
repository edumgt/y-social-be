const express = require("express");
const {
  validateAdCreation,
  validateAdUpdate,
  adAuthorization,
  validateBudget,
  validateAds,
} = require("../middleware/ads.middleware");
const { adsController } = require("../controllers/ads.controller");
const { default: rateLimit } = require("express-rate-limit");

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

const router = express.Router();

router.put(
  "/update/:id",
  validateAds,
  validateAdUpdate,
  validateBudget,
  adsController.updateAd,
);

router.post("/create", validateAdCreation, adsController.createAd);
router.post("/:id/impressions", validateAds, adsController.handleImpression);
router.post("/:id/clicks", validateAds, adsController.handleClicks);
// router.post("/:id/impressions", validateAds, rateLimitImpressions, adsController.handleImpression);
// router.post("/:id/clicks", validateAds, rateLimitClicks, adsController.handleClicks);
router.get("/user/:userId", adsController.getAdByUser);
router.get("/trending", adsController.getAdByTrend);
router.get("/get-all", adsController.getAllAds);
router.get("/scheduling", adsController.getSchedulingAdvertise);
router.get("/:id", validateAds, adsController.getAdById);
router.delete("/delete-all/user/:userId", adsController.deleteAllAdByUser);
router.delete(
  "/delete/:id/user/:userId",
  validateAds,
  adAuthorization,
  adsController.deleteAd,
);

module.exports = router;
