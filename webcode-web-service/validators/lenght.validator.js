const { body, param, query } = require("express-validator");

const textRegexp = /^(?:!)?[%=*.+#12:,()<>a-zA-ZáéíóúÁÉÍÓÚüÜñÑ, ]+$/;

const numRegexp = /^[0-9]+$/;

const paginationRegexp = /^(true|false)$/;

const typeRegexp = /^(Relative|Absolute)$/;

const validators = () => {};

validators.createLenghtValidator = [
  param("identifier").optional(),
  body("lenght")
    .notEmpty()
    .withMessage("Length is required")
    .isString()
    .withMessage("Length must be a string")
    .matches(textRegexp)
    .withMessage("Length can only be letters")
    .isLength({ max: 20 })
    .withMessage("Length max is 20 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 150 })
    .withMessage("Description max is 150 characters"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isString()
    .withMessage("Type must be a string")
    .matches(typeRegexp)
    .withMessage("Type can only be:  relative or absolute")
    .isLength({ max: 100 })
    .withMessage("Type max is 50 characters"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .isMongoId()
    .withMessage("Identifier must be a Mongo ID"),
];

validators.paginationValidator = [
  query("pagination")
    .optional()
    .toBoolean()
    .matches(paginationRegexp)
    .withMessage("Pagination can only be true or false"),
  query("limit")
    .optional()
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Limit min is 0")
    .matches(numRegexp)
    .withMessage("Limit can only be numbers"),
  query("offset")
    .optional()
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Offset min is 0")
    .matches(numRegexp)
    .withMessage("Offset can only be numbers"),
];

module.exports = validators;
