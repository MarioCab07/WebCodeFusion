const { body, param, query } = require("express-validator");

const textRegexp = /^(?:!)?[<>a-zA-ZáéíóúÁÉÍÓÚüÜñÑ, ]+$/;

const numRegexp = /^[0-9]+$/;

const paginationRegexp = /^(true|false)$/;

const validators = () => {};

validators.createAttValidator = [
  param("identifier").optional(),
  body("name")
    .notEmpty()
    .withMessage("Name of attribute is required")
    .isString()
    .withMessage("Name attribute must be a string")
    .matches(textRegexp)
    .withMessage("Name attribute can only be letters")
    .isLength({ max: 20 })
    .withMessage("Name attribute max is 20 characters"),
  body("meaning")
    .notEmpty()
    .withMessage("Meaning is required")
    .isString()
    .withMessage("Meaning must be a string")
    .matches(textRegexp)
    .withMessage("Meaning can only be letters")
    .isLength({ max: 100 })
    .withMessage("Meaning max is 50 characters"),
  body("example")
    .notEmpty()
    .withMessage("Example is required")
    .isString()
    .withMessage("Example must be a string")
    .isLength({ max: 100 })
    .withMessage("Example max is 50 characters"),
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
