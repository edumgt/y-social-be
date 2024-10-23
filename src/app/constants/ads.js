const ADS_TYPE = {
  VIDEO: "video",
  TEXT: "text",
  IMAGE: "image",
  CAROUSEL: "carousel",
  AUDIO: "audio",
  INTERSTITIAL: "interstitial",
  NATIVE: "native",
  GIF: "gif",
  SLIDESHOW: "slideshow",
};

const STRATEGY = {
  TRENDING: 10,
};

const MIN_BUDGET = {
  vnd: 1,
  usd: 0.005,
  eur: 0.0045,
  gbp: 0.0039,
  jpy: 0.6,
  aud: 0.0075,
  cny: 0.03,
  inr: 0.4,
};

const ADS_GOAL = {
  TEXT: "text",
  VIDEO: "video",
  CAROUSEL: "carousel",
  BRAND_AWARENESS: "brand_awareness",
  TRAFFIC: "traffic",
  CONVERSIONS: "conversions",
  ENGAGEMENT: "engagement",
};

const ADS_STATUS = {
  SCHEDULE: "schedule",
  ACTIVE: "active",
  DISABLED: "disabled",
  SUSPENDED: "suspended",
  IN_REVIEW: "in-review",
};

module.exports = { ADS_TYPE, ADS_GOAL, MIN_BUDGET, STRATEGY, ADS_STATUS };
