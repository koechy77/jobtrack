const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "created",
        "status_changed",
        "note_added",
        "interview_scheduled",
        "interview_completed",
        "follow_up",
        "other",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = activitySchema;
