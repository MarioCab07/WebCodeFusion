const express = require("express");
const router = express.Router();

const ROLES = require("../data/rols.constants.json");

const {
  createProblemValidator,
  idInParamsValidator,
  paginationValidator,
} = require("../validators/problem.validators");

const validateFields = require("../validators/index.middleware");

const problemController = require("../controller/problem.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get("/", paginationValidator, validateFields, problemController.findAll);

router.get(
  "/:identifier",
  idInParamsValidator,
  validateFields,
  problemController.findByLevel
);

router.post(
  "/",
  authentication,
  authorization(ROLES.ADMIN),
  createProblemValidator,
  validateFields,
  problemController.save
);

module.exports = router;
