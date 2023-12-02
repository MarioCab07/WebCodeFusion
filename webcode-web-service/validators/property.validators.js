const { body, param, query } = require("express-validator");

const paginationRegexp = /^(true|false)$/;

const textRegexp = /^(?:!)?[*|\.\-+#12:,(<>)azA-ZáéíóúÁÉÍÓÚüÜñÑ, ]+$/;
const numRegexp = /^[0-9]+$/;

const validators = () => {};

// _property["property"] = property;
// _property["description"] = description;
// _property["values"] = values;
// _property["sintaxis"] = sintaxis;
// _property["user"] = user._id;

validators.createPropertyValidator = [
  param("identifier").optional(),
  body("property")
    .notEmpty()
    .withMessage("Property is required")
    .isString()
    .withMessage("Property must be a string")
    .isLength({ max: 50 })
    .withMessage("Property max is 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 100 })
    .withMessage("Description max is 100 characters"),
  body("values")
    .notEmpty()
    .withMessage("Values is required")
    .isString()
    .withMessage("Valus must be a string"),
  body("sintaxis").notEmpty().withMessage("Sintaxis is required"),
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
