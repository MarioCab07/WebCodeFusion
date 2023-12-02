const express = require("express");
const router = express.Router();
const ROLES = require("../data/rols.constants.json");
const authController = require("../controller/auth.controller");

const runValidation = require("../validators/index.middleware");

const { registerValidator } = require("../validators/auth.validators");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.post(
  "/register",
  registerValidator,
  runValidation,
  authController.register
);

router.post("/login", authController.login);

router.get("/findme", authentication, authController.findMe);

module.exports = router;
