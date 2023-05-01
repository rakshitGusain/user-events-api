const express = require("express");

const eventsRouter = require("../src/events");

const api = express.Router();

api.use("/api/v4/app/events");

module.exports = api;
