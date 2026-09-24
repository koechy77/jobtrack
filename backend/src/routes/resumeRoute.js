const express = require("express");
const {
  createResume,
  setDefaultResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const updateResume = require("../middleware/uploadResume");
const uploadResume = require("../middleware/uploadResume");

const router = express.Router();

router.use(protect);

router.route("/").post(uploadResume.single("resume"), createResume);
router.route("/:id/default").patch(setDefaultResume);

module.exports = router;
