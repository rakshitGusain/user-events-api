const express = require("express");

const eventsRouter = require("./routers/events/events.router");

const app = express();

app.use(express.json());

app.use("/api/v3/app/events", eventsRouter);

module.exports = app;
