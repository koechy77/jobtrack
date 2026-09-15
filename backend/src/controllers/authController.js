const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { createRefreshToken } = require("../utils/tokenUtils");
const { setRefreshTokenCookie } = require("../utils/cookieUtils");

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

  if (!user) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Email verified successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.emailVerified) {
    throw new AppError("Please verify your email before logging in", 403);
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = await createRefreshToken(user._id);

  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    status: "success",
    accessToken,
  });
};
