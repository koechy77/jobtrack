const mongoose = require('mongoose');
const refreshTokenSchema = require('../schemas/refreshTokenSchema');

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;