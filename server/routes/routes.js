import express from "express";
import "../config/dotenv.js";
// import controllers for events and locations
import locationController from "../controllers/locationController.js";
import eventController from "../controllers/eventController.js";

const router = express.Router();

// define routes to get events and locations
router.get("/events", eventController.getEvents);

router.get("/events/:id", eventController.getEventsByLocation);

router.get("/locations", locationController.getLocations);

export default router;
