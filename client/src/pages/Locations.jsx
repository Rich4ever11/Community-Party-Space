import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";
import { Link } from "react-router-dom";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="flex justify-center flex-wrap space-x-8 space-y-2 pb-10">
      {locations.map((location) => (
        <div id="venue4button" className="venue4-button-overla">
          <div
            class="max-w-sm bg-white rounded-lg shadow dark:bg-gray-800"
            style={{ textShadow: "2px 2px 4px black" }}
          >
            <a href="#">
              <img
                class="rounded-t-lg"
                src={`/public/assets/party${location.location_id}.avif`}
                alt=""
              />
            </a>
            <div class="p-5">
              <h5 class="mb-2 text-4xl font-thin tracking-tight text-gray-900 dark:text-white">
                {location.name}
              </h5>
              <div className="py-2">
                <p className="text-gray-200">
                  {location.street_name + " " + location.postal_code}
                </p>
                <p className="text-gray-400">
                  {location.city + " " + location.country}
                </p>
              </div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {location.description}
              </p>
              <Link
                to={`/location/${location.location_id}`}
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-black rounded-lg hover:bg-blue-950 focus:ring-blue-300 dark:bg-black dark:focus:ring-blue-800"
                state={{ id: location.location_id }}
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Locations;
