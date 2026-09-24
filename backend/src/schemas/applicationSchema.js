const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },

    compensation: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "NGN",
      },
    },

    period: {
      type: String,
      enum: ["hour", "month", "year"],
    },

    jobUrl: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "saved",
        "applied",
        "screening",
        "interview",
        "offer",
        "rejected",
        "withdrawn",
      ],
      default: "saved",
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "saved",
            "applied",
            "screening",
            "interview",
            "offer",
            "rejected",
            "withdrawn",
          ],
          required: true,
        },

        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    notes: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = applicationSchema;
