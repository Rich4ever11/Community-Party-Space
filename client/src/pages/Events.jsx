import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState();
  const [position, setPosition] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const events = await LocationsAPI.getAllEvents();
        setEvents(events);
        console.log(events);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="">
      <main className="flex flex-wrap justify-center py-8 space-x-4 space-y-8">
        {events.map((event) => (
          <div class="max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <div className="flex justify-center">
              <img
                class="w-32 h-24 mb-3 rounded-full shadow-lg"
                src="https://images.unsplash.com/photo-1643113231904-ea2af9b4ebcb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          </div>
        ))}
      </main>
    </div>
  );
}
