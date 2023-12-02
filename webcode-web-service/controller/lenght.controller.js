const Lenght = require("../models/Lenght.model");
const debug = require("debug")("app:lenght-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { lenght, description, type } = req.body;
    const { identifier } = req.params;
    const { user } = req;

    let _lenght = await Lenght.findById(identifier);

    if (!_lenght) {
      _lenght = new Lenght();
    }

    _lenght["length"] = lenght;
    _lenght["description"] = description;
    _lenght["type"] = type;
    _lenght["user"] = user._id;

    const newLenght = await _lenght.save();

    if (!newLenght) {
      return res.status(509).json({ error: "Error saving lenght" });
    }

    return res.status(201).json(newLenght);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const lengths = await Lenght.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    }).populate("user", "username -_id");

    if (!lengths) {
      return res.status(404).json({ error: "Internal Server error" });
    }

    return res.status(200).json({
      count: pagination ? await Lenght.countDocuments() : undefined,
      lengths,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findByLenght = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const lengths = await Lenght.find({
      $or: [{ length: identifier }, { type: identifier }],
    }).populate("user", "username -_id");

    return res.status(200).json({ lengths });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
