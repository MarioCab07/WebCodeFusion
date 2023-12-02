const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./config/database.config");
const apiRouter = require("./routes/index.router");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL;
const app = express();

database.connect();
//Logger para request
app.use(logger("dev"));

//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

//Static routes
app.use(express.static(path.join(__dirname, "public")));

//API Router

app.use("/api/v1", apiRouter);
module.exports = app;
