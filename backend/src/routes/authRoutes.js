const express = require("express");
const { signUp, login, verifyEmail, logout, refresh  } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

module.exports = router;