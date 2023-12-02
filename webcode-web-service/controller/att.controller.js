const Att = require("../models/attribute.model");
const debug = require("debug")("app:att-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { name, meaning, example } = req.body;

    const { identifier } = req.params;

    const { user } = req;

    let att = await Att.findById(identifier);

    if (!att) {
      att = new Att();
    }

    att["name"] = name;
    att["meaning"] = meaning;
    att["example"] = example;
    att["user"] = user._id;

    const newAtt = await att.save();

    if (!newAtt) {
      return res.status(509).json({ error: "Error saving attribute" });
    }

    return res.status(201).json(newAtt);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const atts = await Att.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    }).populate("user", "username -_id");

    if (!atts) {
      return res.status(500).json({ error: "Internal Server error" });
    }

    return res.status(200).json({
      count: pagination ? await Att.countDocuments() : undefined,
      atts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findByAttName = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const attribute = await Att.find({ name: identifier });

    return res.status(200).json({ attribute });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
