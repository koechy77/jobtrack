const mongoose = require("mongoose");
const Resume = require("../models/resumeModel");

const AppError = require("../../utils/AppError");

exports.createResume = async (req, res) => {
  if (!req.file) {
    throw new AppError("Resume file is required", 400);
  }

  const { name } = req.body;

  const resume = await Resume.create({
    user: req.user._id,

    name,

    metadata: {
      filename: req.file.filename,
      fileUrl: `/uploads/resumes/${req.file.filename}`,
      fileType: req.file.mimetype,
      size: req.file.size,
    },
  });

  res.status(201).json({
    message: "Resume created successfully",
    data: {
      resume,
    },
  });
};

exports.setDefaultResume = async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new AppError("Resume not found", 404);
  }

  if (resume.isDefault) {
    return res.status(200).json({
      message: "Resume is already the default.",
    });
  }

  await mongoose.connection.transaction(async (session) => {
    await Resume.updateOne(
      {
        user: req.user.id,
        isDefault: true,
      },
      {
        $set: {
          isDefault: false,
        },
      },
      {
        session,
      },
    );

    await Resume.updateOne(
      {
        _id: resume._id,
      },
      {
        $set: {
          isDefault: true,
        },
      },
      {
        session,
      },
    );
  });

  res.status(200).json({
    status: "success",
    message: "Default resume updated successfully.",
  });
};
