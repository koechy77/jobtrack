const mongoose = require("mongoose");
const notificationSchema = require("../schemas/notificationSchema");

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
