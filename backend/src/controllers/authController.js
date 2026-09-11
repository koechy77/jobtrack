const crypto = require("crypto");
const User = require("../models/userModel");

const verificationToken = crypto.randomBytes(32).toString("hex");
const hashedToken = crypto
  .createHash("sha256")
  .update(verificationToken)
  .digest("hex");

  const verificationExpires = Date.now() + 15 * 60 * 1000;

  exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        emailVerificationToken: hashedToken,
        emailVerificationExpires: verificationExpires,
    })
  }

  exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
  }
