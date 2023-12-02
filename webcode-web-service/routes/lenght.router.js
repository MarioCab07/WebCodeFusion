const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createLenghtValidator,
  paginationValidator,
  idInParamsValidator,
} = require("../validators/lenght.validator");

const validateFields = require("../validators/index.middleware");

const lenghtController = require("../controller/lenght.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get("/", paginationValidator, validateFields, lenghtController.findAll);

router.get("/:identifier", lenghtController.findByLenght);

router.post(
  "/",
  authentication,
  authorization(ROLES.ADMIN),
  createLenghtValidator,
  validateFields,
  lenghtController.save
);

module.exports = router;
