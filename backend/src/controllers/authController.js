const crypto = require("crypto");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const verificationExpires = Date.now() + 15 * 60 * 1000;

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: verificationExpires,
  });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });
};
