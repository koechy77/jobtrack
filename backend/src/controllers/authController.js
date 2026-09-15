const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../../utils/AppError");
const RefreshToken = require("../models/refreshTokenModel");
const { createRefreshToken, hashToken } = require("../../utils/tokenUtils");
const {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require("../../utils/cookieUtils");
const sendEmail = require("../../utils/email");

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

  const verificationUrl = `http://localhost:5000/api/v1/auth/verify-email?token=${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your JobTrack account",
    text: `Please verify your JobTrack account by visiting: ${verificationUrl}`,
    html: `
    <h2>Welcome to JobTrack!</h2>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="${verificationUrl}">Verify my email</a>
    <p>This link expires in 15 minutes.</p>
  `,
  });

  res.status(201).json({
    status: "success",
    message:
      "Signup successful. Please check your email to verify your account.",
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

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);

    await RefreshToken.updateOne({ tokenHash }, { revoked: true });
  }

  clearRefreshTokenCookie(res);

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError("Your session has expired. Please log in again.", 401);
  }

  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({ tokenHash })
    .select("+tokenHash")
    .populate("user");

  if (!storedToken || storedToken.revoked) {
    throw new AppError("Your session has expired. Please log in again.", 401);
  }

  if (storedToken.expiresAt < new Date()) {
    throw new AppError("Your session has expired. Please log in again.", 401);
  }

  storedToken.revoked = true;

  await storedToken.save();

  const newRefreshToken = await createRefreshToken(storedToken.user._id);

  const newAccessToken = jwt.sign(
    { id: storedToken.user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  setRefreshTokenCookie(res, newRefreshToken);

  res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
  });
};
