import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const events = await LocationsAPI.getAllEvents();
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
        setEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  const handleSelectDropdown = (event) => {
    setFilteredEvents(events);
    const location_id = parseInt(event.target.value);
    const filteredEvents = events.filter(
      (event) => parseInt(event.location) === location_id
    );
    setFilteredEvents(filteredEvents);
  };

  const handleViewAllEvents = () => {
    setFilteredEvents(events);
  };

  const handleCountDownFunctionality = (seconds) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + seconds * 1000);

    const diff = futureDate - now;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `Time Remaining - ${years} years ${days} days ${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <div class="flex w-full max-w-lg ">
          <div class="relative w-full">
            <label class="block mb-1 text-sm text-white">Location</label>

            <select
              class="w-full bg-black text-white text-sm border border-cyan-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-cyan-400 hover:border-cyan-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              onChange={handleSelectDropdown}
            >
              {locations.map((location) => (
                <option value={location.location_id}>{location.name}</option>
              ))}
            </select>
            <div className="w-32 py-2">
              <button
                className="text-sm h-8 text-white bg-black rounded-lg hover:bg-blue-950 focus:ring-blue-300 dark:bg-black dark:focus:ring-blue-800"
                onClick={handleViewAllEvents}
              >
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-wrap justify-center py-8 space-x-4 space-y-2">
        {filteredEvents.map((event) => (
          <div class="max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <div className="flex justify-center">
              <img
                class="w-32 h-24 mb-3 rounded-full shadow-lg"
                src="/public/assets/event.avif"
                alt="Bonnie image"
              />
            </div>

            <a className="flex justify-center">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {event.name}
              </h5>
            </a>
            <div className="flex justify-center">
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {event.description}
              </p>
            </div>

            <div className="max-w-full">
              <p className="text-sm text-white font-thin">
                {handleCountDownFunctionality(event.event_time_seconds)}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
