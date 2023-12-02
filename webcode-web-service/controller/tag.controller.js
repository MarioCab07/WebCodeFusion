const Tag = require("../models/Tag.model");
const debug = require("debug")("app:tag-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { tagName, opening, closing, sintaxis, functioning, example } =
      req.body;
    const { identifier } = req.params;

    const { user } = req;

    let tag = await Tag.findById(identifier);

    if (!tag) {
      tag = new Tag();
    }

    tag["tagName"] = tagName;
    tag["opening"] = opening;
    tag["closing"] = closing;
    tag["sintaxis"] = sintaxis;
    tag["functioning"] = functioning;
    tag["example"] = example;
    tag["user"] = user._id;

    const tagSaved = await tag.save();

    if (!tagSaved) {
      return res.status(509).json({ error: "Error creating Tag" });
    }

    return res.status(201).json(tagSaved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 5, offset = 0 } = req.query;

    const tags = await Tag.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    }).populate("user", "username  -_id");

    if (!tags) {
      return res.status(500).json({ error: "Internal Server error" });
    }

    return res.status(200).json({
      count: pagination ? await Tag.countDocuments() : undefined,
      tags,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findByTagname = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const tag = await Tag.find({ tagName: identifier }).populate(
      "user",
      "username -_id"
    );

    // if (tag.length() === 0) {
    //   return res.status(404).json({ error: "Tag not found" });
    // }
    return res.status(200).json({ tag });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
