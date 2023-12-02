const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createAttValidator,
  paginationValidator,
  idInParamsValidator,
} = require("../validators/att.validatos");

const validateFields = require("../validators/index.middleware");

const attController = require("../controller/att.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get("/", paginationValidator, validateFields, attController.findAll);

router.get("/:identifier", validateFields, attController.findByAttName);
router.post(
  "/",
  authentication,
  authorization(ROLES.ADMIN),
  createAttValidator,
  validateFields,
  attController.save
);

module.exports = router;
