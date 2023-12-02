const User = require("../models/User.model");

const { createToken, verifyToken } = require("../utils/jwt.tools");
const controller = {};
const ROLES = require("../data/rols.constants.json");

controller.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      roles: [ROLES.USER],
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
};

controller.login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.comparedPassword(password)) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = await createToken(user._id);

    let _tokens = [...user.tokens];

    const _verifyPromises = _tokens.map(async (_t) => {
      const status = await verifyToken(_t);
      return status ? _t : null;
    });

    _tokens = (await Promise.all(_verifyPromises))
      .filter((_t) => _t)
      .slice(0, 4);

    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

controller.findMe = async (req, res, next) => {
  try {
    const { _id, username, email, roles } = req.user;
    return res.status(200).json({ _id, username, email, roles });
  } catch (error) {}
};

module.exports = controller;
