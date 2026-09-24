const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Resume name is required"],
      trim: true,
    },

    metadata: {
      filename: {
        type: String,
        required: true,
        trim: true,
      },

      fileUrl: {
        type: String,
        required: true,
        trim: true,
      },

      fileType: {
        type: String,
        required: true,
        trim: true,
      },

      size: {
        type: Number,
        required: true,
        min: 1,
      },
    },
    
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// A user cannot have two resumes with the same name
resumeSchema.index(
  { user: 1, name: 1 },
  {
    unique: true,
  },
);

// A user can have at most one default resume
resumeSchema.index(
  { user: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDefault: true,
    },
  },
);

module.exports = resumeSchema;
