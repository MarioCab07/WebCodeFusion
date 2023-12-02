const { body, param } = require("express-validator");

const validators = () => {};

validators.createCommentValidtor = [
  param("identifier").optional(),
  body("content").notEmpty().withMessage("Content is Required"),
];

validators.saveResponseValidator = [
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 280 })
    .withMessage("Content max lenght is 280 characters"),
  body("_id")
    .optional()
    .notEmpty()
    .withMessage("_id is required")
    .isMongoId()
    .withMessage("Identifier must be a Mongo ID"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .isMongoId()
    .withMessage("Identifier must be a Mongo ID"),
];

module.exports = validators;
