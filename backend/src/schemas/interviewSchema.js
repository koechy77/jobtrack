const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    type: {
      type: String,
      enum: ["phone", "video", "onsite", "technical", "behavioral", "other"],
      required: true,
    },

    platform: {
      type: String,
      trim: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      min: 1,
    },

    location: {
      type: String,
      trim: true,
    },

    interviewers: [
      {
        name: {
          type: String,
          trim: true,
        },

        role: {
          type: String,
          trim: true,
        },
      },
    ],

    notes: {
      type: String,
      trim: true,
    },

    outcome: {
      type: String,
      enum: ["pending", "passed", "failed", "cancelled", "rescheduled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = interviewSchema;
