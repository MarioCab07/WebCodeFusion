const Comment = require("../models/Comment.model");
const debug = require("debug")("app:post-controller");

const controller = {};

controller.saveComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { user } = req;
    const { identifier } = req.params;

    let comment = await Comment.findById(identifier);

    if (!comment) {
      comment = new Comment();
      comment["user"] = user._id;
    } else {
      if (!comment["user"].equals(user._id)) {
        return res.status(403).json({ error: "Not your commentary" });
      }
    }

    comment["content"] = content;

    const commentSaved = await comment.save();

    if (!commentSaved) {
      return res.status(509).json({ error: "Error saving comment" });
    }

    return res.status(201).json(commentSaved);
  } catch (error) {
    return res.status(500).json({ error: "Interntal Server Error" });
  }
};

controller.saveResponse = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { content } = req.body;
    const user = req.user;

    const comment = await Comment.findOne({ _id: identifier }).populate(
      "user",
      "username email -_id"
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    let _responses = comment["responses"];

    _responses = [..._responses, { user: user._id, content: content }];

    comment["responses"] = _responses;

    const newComment = await (
      await comment.save()
    ).populate("responses.user", "username email");

    return res.status(200).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 10, offset = 0 } = req.query;

    const comments = await Comment.find(undefined, undefined, {
      limit: pagination ? 20 : undefined,
      skip: pagination ? offset : undefined,
      sort: [{ createdAt: -1 }],
    })
      .populate("likes", "username email")
      .populate("user", "username email -_id")
      .populate("responses.user", "username email");

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ error: "Interntal Server Error" });
  }
};

controller.likeComment = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    const comment = await Comment.findOne({ _id: identifier })
      .populate("user", "username email")
      .populate("responses.user", "username email");

    if (!comment) {
      return res.status(404).json({ error: "Post not found" });
    }

    let _likes = comment["likes"] || [];

    const alreadylike = _likes.findIndex((_i) => _i.equals(user._id)) >= 0;

    if (alreadylike) {
      _likes = _likes.filter((_i) => !_i.equals(user._id));
    } else {
      _likes = [user._id, ..._likes];
    }

    comment["likes"] = _likes;

    const newComment = await (
      await comment.save()
    ).populate("likes", "username email");

    return res.status(200).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: "Interntal Server Error " });
  }
};

module.exports = controller;
