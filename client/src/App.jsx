import React from "react";
import { useRoutes, Link } from "react-router-dom";
import Locations from "./pages/Locations.jsx";
import LocationEvents from "./pages/LocationEvents.jsx";
import Events from "./pages/Events.jsx";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Locations />,
    },
    {
      path: "/location/:id",
      element: <LocationEvents index={1} />,
    },
    {
      path: "/events",
      element: <Events />,
    },
  ]);

  return (
    <div className="bg-gradient-to-r from-sky-900 to-black">
      <header className="text-3xl">
        <div className="flex justify-center py-4">
          <h1
            className="text-8xl font-thin"
            style={{ textShadow: "8px 8px 8px black" }}
          >
            Party Animal 🥳
          </h1>
        </div>

        <div className="flex justify-center space-x-4 py-2">
          <Link
            to="/"
            role="button"
            className=" bg-black rounded-lg hover:bg-blue-950 focus:ring-blue-300 dark:bg-black dark:focus:ring-blue-800"
          >
            Home
          </Link>
          <Link
            to="/events"
            role="button"
            className=" bg-black rounded-lg hover:bg-blue-950 focus:ring-blue-300 dark:bg-black dark:focus:ring-blue-800"
          >
            Events
          </Link>
        </div>
      </header>

      <main>{element}</main>
    </div>
  );
};

export default App;
