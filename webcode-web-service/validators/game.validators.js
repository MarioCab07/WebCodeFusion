const { body, param, query } = require("express-validator");

const textRegexp = /^(?:!)?[<>a-zA-ZáéíóúÁÉÍÓÚüÜñÑ, ]+$/;

const numRegexp = /^[0-9]+$/;

const paginationRegexp = /^(true|false)$/;

const validators = () => {};

validators.saveGameValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("puntuation")
    .notEmpty()
    .withMessage("is required")
    .toInt()
    .isInt()
    .withMessage("Puntuation must be int"),
];

validators.nameInParams = [
  param("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .isString()
    .withMessage("identifier must be a string"),
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
