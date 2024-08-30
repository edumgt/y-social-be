const mongoose = require("mongoose");

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
    },
    { _id: false }
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
        currency: {
            type: String,
            default: 'vnd',
            enum: ['usd', 'vnd'],
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
        result: [dailyAdAnalyticsSchema]
    },
    { timestamps: true }
);

const adModel = mongoose.model("ad", adsSchema);

module.exports = adModel;
