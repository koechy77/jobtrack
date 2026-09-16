const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../../utils/AppError");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401,
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("The user no longer exists.", 401);
  }

  req.user = user;
  next();
};

