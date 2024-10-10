import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import Event from "../components/Event";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";

const LocationEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState();
  const [position, setPosition] = useState([]);
  const locationState = useLocation();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        const found_location = locationsData.filter(
          (location) => location.location_id === parseInt(id)
        );
        // check if this is a valid location and if not return not found or something
        const venue = found_location[0];
        setLocation(venue);
        setPosition([venue.longitude, venue.latitude]);
        const locationsEventsData = await LocationsAPI.getEventsByLocation(id);
        setEvents(locationsEventsData);
        console.log(locationsEventsData);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

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
      {location && (
        <div className="max-w-full">
          <a class="flex basis-full max-w-full  items-center bg-black border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:hover:bg-gray-700">
            <img
              class="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg"
              src="https://images.unsplash.com/photo-1485872299829-c673f5194813?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h1 class="mb-2 text-6xl font-thin tracking-tight text-gray-900 dark:text-white">
                {location.name}
              </h1>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {location.description}
              </p>
              <div className="py-2">
                <p className=" ">
                  {location.street_name + " " + location.postal_code}
                </p>
                <p className=" ">{location.city + " " + location.country}</p>
              </div>
            </div>
          </a>
        </div>
      )}

      {position.length && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{location.name}</Popup>
          </Marker>
        </MapContainer>
      )}

      <main className="flex flex-wrap justify-center py-8">
        {events.map((event) => (
          <div class="transition duration-700 ease-in-out m-4 max-w-sm p-8 bg-black hover:bg-cyan-950 border-cyan-200 rounded-lg shadow dark:border-cyan-100 border-2">
            <div className="flex justify-center ">
              <img
                class="w-32 h-24 mb-3 rounded-full shadow-lg "
                src="/public/assets/event.avif"
                alt="Bonnie image"
              />
            </div>

            <a className="flex justify-center">
              <h5 class="mb-2 text-4xl font-thin tracking-tight text-gray-900 dark:text-white">
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
};

export default LocationEvents;
