const debug = require("debug")("app:auth-middleware");
const { verifyToken } = require("../utils/jwt.tools");

const User = require("../models/User.model");

const ROLES = require("../data/rols.constants.json");

const middleware = {};

const PREFIX = "Bearer";

middleware.authentication = async (req, res, next) => {
  try {
    debug("User authentication");

    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const [prefix, token] = authorization.split(" ");

    if (prefix !== PREFIX) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = payload["sub"];

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const isTokenValid = user.tokens.includes(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

middleware.authorization = (roleRequired = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    try {
      const { roles = [] } = req.user;
      debug(roles);

      const isAuth = roles.includes(roleRequired);
      const isSysadmin = roles.includes(ROLES.SYSADMIN);

      if (!isAuth && !isSysadmin) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = middleware;
