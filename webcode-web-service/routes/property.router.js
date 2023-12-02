const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createPropertyValidator,
  paginationValidator,
} = require("../validators/property.validators");

const validateFields = require("../validators/index.middleware");

const propertyController = require("../controller/property.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get(
  "/",
  paginationValidator,
  validateFields,
  propertyController.findALl
);

router.get("/:identifier", propertyController.findByProperty);

router.post(
  "/",
  authentication,
  authorization(ROLES.ADMIN),
  createPropertyValidator,
  validateFields,
  propertyController.save
);

module.exports = router;
