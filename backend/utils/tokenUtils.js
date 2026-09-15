const crypto = require("crypto");
const RefreshToken = require("../src/models/refreshTokenModel");

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const createRefreshToken = async (userId) => {
  const rawToken = generateRefreshToken();

  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const refreshToken = await RefreshToken.create({
    user: userId,
    tokenHash,
    expiresAt,
  });
  return rawToken;
};

module.exports = {
  generateRefreshToken,
  hashToken,
  createRefreshToken,
};
