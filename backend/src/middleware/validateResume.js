const { body, validationResult } = require("express-validator");
const AppError = require("../../utils/AppError");

const validateResume = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Resume name is required")
    .isLength({ max: 100 })
    .withMessage("Resume name cannot exceed 100 characters"),

  body("metadata")
    .notEmpty()
    .withMessage("Resume metadata is required")
    .isObject()
    .withMessage("Metadata must be an object"),

  body("metadata.filename")
    .trim()
    .notEmpty()
    .withMessage("Filename is required"),

  body("metadata.fileUrl")
    .trim()
    .notEmpty()
    .withMessage("File URL is required")
    .isURL()
    .withMessage("File URL must be a valid URL"),

  body("metadata.fileType")
    .trim()
    .notEmpty()
    .withMessage("File type is required")
    .isIn([
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ])
    .withMessage("File type must be PDF or DOCX"),

  body("metadata.size")
    .notEmpty()
    .withMessage("File size is required")
    .isInt({
      min: 1,
      max: 5 * 1024 * 1024,
    })
    .withMessage("File size must be between 1 byte and 5 MB"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError("Invalid request data", 400, errors.array());
    }

    next();
  },
];

module.exports = validateResume;
