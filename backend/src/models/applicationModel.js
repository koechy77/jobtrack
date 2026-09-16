const mongoose = require("mongoose");
const applicationSchema = require("../schemas/applicationSchema");

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
