const { body, param, query } = require("express-validator");

const numRegexp = /^[0-9]+$/;

const regex = /^(fácil|intermedio|dificil)$/;

const paginationRegexp = /^(true|false)$/;

const validators = () => {};

// body("selector")
// .notEmpty()
// .withMessage("Selector is required")
// .isString()
// .withMessage("Selector must be a string")
// .matches(textRegexp)
// .withMessage("Selector can only be letters")
// .isLength({ max: 20 })
// .withMessage("Selector max is 20 characters"),
// body("description")
// .notEmpty()
// .withMessage("Description is required")
// .isString()
// .withMessage("Description must be a string")
// .matches(textRegexp)
// .withMessage("Description can only be letters")
// .isLength({ max: 100 })
// .withMessage("Description max is 50 characters"),

validators.createProblemValidator = [
  body("level")
    .notEmpty()
    .withMessage("Level is required")
    .matches(numRegexp)
    .withMessage("Level can only be numbers"),
  body("difficulty")
    .notEmpty()
    .withMessage("Difficulty is required")
    .isString()
    .matches(regex)
    .withMessage("Difficulty can only be :facil,intermedio o dificil")
    .isLength({ max: 30 }),
  body("tag").notEmpty().withMessage("Tag is required"),
  body("functioning").notEmpty().withMessage("Functioning is required"),
  body("example").notEmpty().withMessage("Example is required"),
  body("sintaxis").notEmpty().withMessage("Sintaxis is required"),
  body("problem").notEmpty().withMessage("Problem is required"),
  body("posibleSolutions")
    .notEmpty()
    .withMessage("Posible Solutions are required"),
  body("correctSolution")
    .notEmpty()
    .withMessage("Correct Solution is required"),
  body("explanation").notEmpty().withMessage("Explanation is required"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .matches(numRegexp)
    .withMessage("Identifier can only be numbers"),
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
