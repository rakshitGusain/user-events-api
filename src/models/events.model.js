const eventDatabase = require("./events.mongo");

const DEFAULT_EVENT_ID = 0;

async function saveEvent(event) {
  await eventDatabase.findOneAndUpdate(
    {
      eventId: event.eventId,
    },
    event,
    {
      upsert: true,
    }
  );
}

async function getLatestEventId() {
  const latestEvent = await eventDatabase.findOne().sort("-eventId");

  if (!latestEvent) return DEFAULT_EVENT_ID;

  return latestEvent.eventId;
}

async function createNewEvent(event) {
  const eventId = (await getLatestEventId()) + 1;

  event = {
    ...event,
    eventId,
  };

  await saveEvent(event);
}

async function updateEventByID(event) {
  let oldEvent = await eventDatabase.findOne({
    eventId: event.eventId,
  });

  if (!oldEvent) {
    throw new Error("No Matching Event Found");
  }

  for (prop in event) {
    oldEvent[prop] = event[prop];
  }

  console.log(oldEvent.eventId);
  console.log(oldEvent.name);
  console.log(oldEvent.tagline);

  await saveEvent(oldEvent);
}

async function findEventByID(eventId) {
  const event = await eventDatabase.findOne({
    eventId: eventId,
  });

  return event;
}

async function deleteEventByID(eventId) {
  const event = await findEventByID(eventId);

  if (!event) {
    throw new Error("No Matching event found");
  }

  await eventDatabase.deleteOne({
    eventId: eventId,
  });
}

async function getAllEvents(type, limit, skip) {
  return await eventDatabase
    .find({}, { _id: 0, __v: 0 })
    .sort(type)
    .skip(skip)
    .limit(limit);
}

module.exports = {
  findEventByID,
  createNewEvent,
  updateEventByID,
  deleteEventByID,
  getAllEvents,
};
