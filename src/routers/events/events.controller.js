const {
  findEventByID,
  createNewEvent,
  updateEventByID,
  deleteEventByID,
  getAllEvents,
} = require("../../models/events.model");

const { getPagination } = require("../../services/query");

async function httpGetEventById(req, res) {
  const eventId = req.params.id;

  try {
    const event = await findEventByID(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to retrieve",
    });
  }
}

async function httpCreateNewEvent(req, res) {
  const event = req.body;

  try {
    await createNewEvent(event);
    res.status(201).json(event);
  } catch (err) {
    // console.log(err);
    res.status(201).json({
      error: "Couldn't create the event. Please try again",
      err,
    });
  }
}

async function httpUpdateEventById(req, res) {
  const eventId = req.params.id;

  let event = req.body;

  event.eventId = eventId;

  console.log(`Recieved the Event in backend ! -> ${eventId}`);

  if (!eventId) {
    return res.status(400).json({
      error: "No Event ID found !!",
    });
  }

  try {
    await updateEventByID(event);

    res.status(200).json(event);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: "Couldn't update the event",
    });
  }
}

async function httpDeleteEventById(req, res) {
  const eventId = req.params.id;

  try {
    await deleteEventByID(eventId);

    res.status(200).json({
      message: `Successly deleted the event with program ID ${eventId}`,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: "No matching event found",
    });
  }
}

async function httpGetAllEvents(req, res) {
  const { type, limit, skip } = getPagination(req.query);
  const events = await getAllEvents(type, limit, skip);
  return res.status(200).json(events);
}

module.exports = {
  httpGetEventById,
  httpCreateNewEvent,
  httpUpdateEventById,
  httpDeleteEventById,
  httpGetAllEvents,
};
