import { pool } from "../config/database.js";
import "../config/dotenv.js";

const getEvents = async (req, res) => {
  const getEventsQuery = `
    SELECT *
    FROM event
    ORDER BY event_id ASC
`;

  try {
    const result = await pool.query(getEventsQuery);
    console.log("🎉 event data obtained");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error grabbing event data: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getEventsByLocation = async (req, res) => {
  const getEventsByLocationQuery = `
      SELECT *
      FROM event
      WHERE location = ${req.params.id}
      ORDER BY event_id ASC
  `;

  try {
    const result = await pool.query(getEventsByLocationQuery);
    console.log("🎉 event data obtained");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("⚠️ error grabbing event data: ", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getEvents,
  getEventsByLocation,
};
