require("./avoid-render-sleep");
const scheduleStartAdvertise = require("./scheduler-start-advertise");
const scheduleSyncNewPayment = require("./scheduler-sync-new-payment");
const scheduleCheckUserBudget = require("./schedule-check-user-budget");
// require("./scheduler-update-advertise-anaylytics");

scheduleCheckUserBudget.start();
scheduleStartAdvertise.start();
scheduleSyncNewPayment.start();
