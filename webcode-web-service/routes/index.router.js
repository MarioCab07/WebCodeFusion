const express = require("express");
const router = express.Router();

const tagRouter = require("./tag.router");
const authRouter = require("./auth.router");
const gameRouter = require("./game.router");
const attRouter = require("./att.router");
const selectorRouter = require("./selector.router");
const lenghtRouter = require("./lenght.router");
const propertyRouter = require("./property.router");
const problemRouter = require("./problem.router");
const commentRouter = require("./comment.router");

router.use("/tag", tagRouter);
router.use("/auth", authRouter);
router.use("/game", gameRouter);
router.use("/attribute", attRouter);
router.use("/selector", selectorRouter);
router.use("/lenght", lenghtRouter);
router.use("/property", propertyRouter);
router.use("/problem", problemRouter);
router.use("/comment", commentRouter);

module.exports = router;
