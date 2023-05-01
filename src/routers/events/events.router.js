const express = require("express");
const {
  httpGetEventById,
  httpGetAllEvents,
  httpCreateNewEvent,
  httpUpdateEventById,
  httpDeleteEventById,
} = require("./events.controller");

const eventsRouter = express.Router();

eventsRouter.get("/:id", httpGetEventById);
eventsRouter.get("/", httpGetAllEvents);
eventsRouter.post("/", httpCreateNewEvent);
eventsRouter.put("/:id", httpUpdateEventById);
eventsRouter.delete("/:id", httpDeleteEventById);

module.exports = eventsRouter;
