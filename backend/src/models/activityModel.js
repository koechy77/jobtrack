const mongoose = require('mongoose');
const activitySchema = require('../schemas/activitySchema');

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;