require("./avoid-render-sleep");
const scheduleStartAdvertise = require("./scheduler-start-advertise");
const scheduleSyncNewPayment = require("./scheduler-sync-new-payment");
const scheduleCheckUserBudget = require("./schedule-check-user-budget");
const schedulerUpdateAdvertiseAnaylytics = require("./scheduler-update-advertise-anaylytics");

scheduleCheckUserBudget.start();
scheduleStartAdvertise.start();
schedulerUpdateAdvertiseAnaylytics.start();
scheduleSyncNewPayment.start();
