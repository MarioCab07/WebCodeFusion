const express = require("express");
const router = express.Router();

const {
  createCommentValidtor,
  saveResponseValidator,
  idInParamsValidator,
} = require("../validators/comment.validators");

const validateFields = require("../validators/index.middleware");

const commentController = require("../controller/comment.controller");

const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

router.get("/", commentController.findAll);

router.post(
  ["/", "/:identifier"],
  authentication,
  createCommentValidtor,
  validateFields,
  commentController.saveComment
);

router.patch(
  "/like/:identifier",
  authentication,
  idInParamsValidator,
  validateFields,
  commentController.likeComment
);

router.patch(
  "/response/:identifier",
  authentication,
  idInParamsValidator,
  saveResponseValidator,
  validateFields,
  commentController.saveResponse
);

module.exports = router;
