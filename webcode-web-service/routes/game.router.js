const express = require("express");
const router = express.Router();

const {
  saveGameValidator,
  nameInParams,
  paginationValidator,
} = require("../validators/game.validators");

const validateFleds = require("../validators/index.middleware");

const gameController = require("../controller/game.controller");

const { authentication } = require("../middleware/auth.middleware");

router.get(
  "/:identifier",
  paginationValidator,
  validateFleds,
  gameController.findAll
);

router.get(
  "/user/:identifier",
  authentication,
  paginationValidator,
  validateFleds,
  gameController.findByGame
);

router.post(
  "/save",
  authentication,
  saveGameValidator,
  validateFleds,
  gameController.save
);

module.exports = router;
