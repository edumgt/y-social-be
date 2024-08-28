const mongoose = require("mongoose");

const adAnalyticsSchema = new mongoose.Schema(
    {
        adID: {
            type: String,
            required: true,
        },
        impressions: {
            type: Number,
            required: true,
        },
        clicks: {
            type: Number,
            required: true,
        },
        conversions: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const goalSchema = new mongoose.Schema(
    {
        adID: {
            type: String,
            required: true,
        },
        goalID: {
            type: String,
            required: true,
        },
    }
);

const targetAudienceSchema = new mongoose.Schema(
    {
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
    }
);

const adsSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            max: 400
        },
        description: {
            type: String,
            required: true,
            max: 2000
        },
        media_content: {
            type: String,
        },
        budget: {
            type: Number,
            required: true,
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
        status: {
            type: Boolean,
            default: false,
        },
        goal: {
            type: goalSchema,
            required: true,
        },
        adTargetAudience: {
            type: targetAudienceSchema,
        },
        result: {
            type: adAnalyticsSchema,
        },
    },
    { timestamps: true }
);

const adModel = mongoose.model("ad", adsSchema);

module.exports = adModel;
