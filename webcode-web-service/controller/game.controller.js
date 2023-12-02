const Game = require("../models/Game.model");
const debug = require("debug")("app:game-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { name, puntuation } = req.body;
    const user = req.user;

    const game = new Game();
    game["user"] = user._id;
    game["name"] = name;
    game["puntuation"] = puntuation;

    const gameSaved = await game.save();

    if (!gameSaved) {
      return res.status(509).json({ error: "Error Saving Game" });
    }

    return res.status(200).json(gameSaved);
  } catch (error) {
    next(error);
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;
    const { identifier } = req.params;

    const game = await Game.find({ name: identifier }, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
      sort: [{ puntuation: -1 }],
    }).populate("user", "username");

    return res.status(200).json({ game });
  } catch (error) {
    next(error);
  }
};

controller.findByGame = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const { identifier } = req.params;

    const games = await Game.find({ name: identifier }, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
      sort: [{ puntuation: -1 }],
    }).populate("user", "username");

    if (!games) {
      return res.status(404).json({ error: "Games not found" });
    }

    return res.status(200).json({ games });
  } catch (error) {
    next(error);
  }
};

module.exports = controller;
