const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },

    type: {
      type: String,
      enum: [
        "follow-up",
        "interview",
        "application-deadline",
        "custom-reminder",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    scheduledFor: {
      type: Date,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = notificationSchema;
