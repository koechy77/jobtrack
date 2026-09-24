const mongoose = require("mongoose");
const interviewSchema = require("../schemas/interviewSchema");

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
