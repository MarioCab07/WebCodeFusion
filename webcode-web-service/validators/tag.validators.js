const { body, param, query } = require("express-validator");

const textRegexp = /^(?:!)?[<>a-zA-ZáéíóúÁÉÍÓÚüÜñÑ, \d]+$/;

const numRegexp = /^[0-9]+$/;

const paginationRegexp = /^(true|false)$/;

const validators = () => {};

validators.createTagValidator = [
  param("identifier").optional(),
  body("tagName")
    .notEmpty()
    .withMessage("Tagname is required")
    .isLength({ max: 20 })
    .withMessage("Tag name max lenght is 12 characters")
    .matches(textRegexp)
    .withMessage("Tagname can only be letters"),
  body("opening")
    .notEmpty()
    .withMessage("Opening tag is required")
    .isString()
    .withMessage("Opening tag must be string")
    .isLength({ max: 15 }),
  body("closing")
    .optional()
    .isString("Closing must be String")
    .isLength({ max: 15 }),
  body("sintaxis")
    .notEmpty()
    .withMessage("Sintaxis is required")
    .isString()
    .withMessage("Sintaxis must be a string")
    .matches(textRegexp)
    .withMessage("Sintaxis can only be letters"),
  body("functioning")
    .notEmpty()
    .withMessage("Functioning is required")
    .isString()
    .withMessage("Functioning must be a string")
    .matches(textRegexp)
    .withMessage("Functioning can only be letters"),
  body("example")
    .notEmpty()
    .withMessage("Example is required")
    .isString()
    .withMessage("Example must be a string"),
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
