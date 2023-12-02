const Property = require("../models/Property.model");
const debug = require("debug")("app:property-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { property, description, values, sintaxis } = req.body;
    const { user } = req;

    const _property = new Property();

    _property["property"] = property;
    _property["description"] = description;
    _property["values"] = values;
    _property["sintaxis"] = sintaxis;
    _property["user"] = user._id;

    const newProperty = await _property.save();

    if (!newProperty) {
      return res.status(509).json({ error: "Error saving property" });
    }

    return res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findALl = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const properties = await Property.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    }).populate("user", "username -_id");

    if (!properties) {
      return res.status(500).json("Properties not found");
    }

    return res.status(200).json({
      count: pagination ? await Property.countDocuments() : undefined,
      properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findByProperty = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const property = await Property.find({ property: identifier }).populate(
      "user",
      "username -_id"
    );

    return res.status(200).json({ property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
