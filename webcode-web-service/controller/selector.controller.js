const Selector = require("../models/Selector.model");
const debug = require("debug")("app:selector-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { selector, description } = req.body;
    const { identifier } = req.params;
    const { user } = req;

    let _selector = await Selector.findById(identifier);

    if (!_selector) {
      _selector = new Selector();
    }

    _selector["selector"] = selector;
    _selector["description"] = description;
    _selector["user"] = user._id;

    const newSelect = await _selector.save();

    if (!newSelect) {
      return res.status(509).json({ error: "Error saving selector" });
    }

    return res.status(201).json(newSelect);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const selectors = await Selector.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    }).populate("user", "username -_id");

    if (!selectors) {
      return res.status(500).json({ error: "Internal Server error" });
    }

    return res.status(200).json({
      count: pagination ? await Selector.countDocuments() : undefined,
      selectors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findBySelector = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const selector = await Selector.find({ selector: identifier }).populate(
      "user",
      "username -_id"
    );

    return res.status(200).json({ selector });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
