const mongoose = require("mongoose");
const { _HOBBIE_LIST } = require("./constants");

const dailyAdAnalyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    conversions: {
      type: Number,
      default: 0,
    },
    // cost per day
    cost: {
      type: Number,
      default: 0,
    },
    // conversion rate (click through rate)
    ctr: {
      type: Number,
      default: 0,
    },
    // cost per view
    cpv: {
      type: Number,
      default: 0,
    },
    // cost per clicks
    cpc: {
      type: Number,
      default: 0,
    },
    // cost per miles (per 1000 impressions)
    cpm: {
      type: Number,
      default: 0,
    }
  },
  { _id: false },
);

const goalSchema = new mongoose.Schema({
  goalID: {
    type: String,
    required: true,
  },
});

const targetAudienceSchema = new mongoose.Schema({
  adID: {
    type: String,
    required: true,
  },
  ageRange: {
    type: String,
  },
  gender: {
    type: String,
  },
  location: {
    type: String,
  },
  interest: {
    type: String,
  },
});

const adsSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 400,
    },
    description: {
      type: String,
      required: true,
      max: 2000,
    },
    media_content: {
      type: String,
      required: true,
    },
    topic:{
      type: String,
      default: _HOBBIE_LIST.SPORTS,
      enum: _HOBBIE_LIST
    },
    budget: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "vnd",
      enum: ["usd", "vnd"],
    },
    schedule_start: {
      type: Date,
      required: true,
    },
    schedule_end: {
      type: Date,
    },
    cta: {
      type: String,
      required: true,
    },
    link_action: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "schedule", "disabled", "suspended", "in_review"],
      default: "active",
    },
    goal: {
      type: goalSchema,
      required: true,
    },
    adTargetAudience: {
      type: targetAudienceSchema,
    },
    isEnoughBudget: {
      type: Boolean,
      default: true,
    },
    result: [dailyAdAnalyticsSchema],
    score: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

const adModel = mongoose.model("ad", adsSchema);

module.exports = adModel;
