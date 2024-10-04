const getAllLocations = async () => {
  try {
    const response = await fetch("/api/locations");
    const locationData = await response.json();
    return locationData.data;
  } catch {
    return [];
  }
};

const getEventsByLocation = async (location_id) => {
  try {
    const response = await fetch(`/api/events/${location_id}`);
    const eventsByLocation = await response.json();
    return eventsByLocation.data;
  } catch {
    return [];
  }
};

const getAllEvents = async () => {
  try {
    const response = await fetch(`/api/events`);
    const events = await response.json();
    return events.data;
  } catch {
    return [];
  }
};

export default {
  getAllLocations,
  getEventsByLocation,
  getAllEvents,
};
