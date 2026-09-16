const express = require("express");
const {
  signUp,
  login,
  verifyEmail,
  logout,
  refresh,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

router.use(protect); //every route after this middleware will require authentication

router.get("/me", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "You have accessed your profile",
  });
});

module.exports = router;
