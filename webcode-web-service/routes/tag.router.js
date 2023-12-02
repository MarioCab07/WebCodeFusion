const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createTagValidator,
  paginationValidator,
} = require("../validators/tag.validators");

const validateFields = require("../validators/index.middleware");

const tagController = require("../controller/tag.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get("/", paginationValidator, validateFields, tagController.findAll);

router.get("/:identifier", tagController.findByTagname);

router.post(
  ["/", "/:identifier"],
  authentication,
  authorization(ROLES.ADMIN),
  createTagValidator,
  validateFields,
  tagController.save
);

module.exports = router;
