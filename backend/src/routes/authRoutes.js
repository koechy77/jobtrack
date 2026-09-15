const express = require("express");
const { signUp, login, verifyEmail } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;