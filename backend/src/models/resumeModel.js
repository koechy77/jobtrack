const mongoose = require("mongoose");
const resumeSchema = require("../schemas/resumeSchema");

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
