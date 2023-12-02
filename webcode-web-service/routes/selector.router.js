const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createSelectorValidator,
  paginationValidator,
  idInParamsValidator,
} = require("../validators/selector.validators");

const validateFields = require("../validators/index.middleware");

const selectorController = require("../controller/selector.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get(
  "/",
  paginationValidator,
  validateFields,
  selectorController.findAll
);

router.get("/:identifier", validateFields, selectorController.findBySelector);

router.post(
  "/",
  authentication,
  authorization(ROLES.ADMIN),
  createSelectorValidator,
  validateFields,
  selectorController.save
);

module.exports = router;
