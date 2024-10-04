import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  const getLocationQuery = `
    SELECT *
    FROM location
    ORDER BY location_id ASC
`;

  try {
    const result = await pool.query(getLocationQuery);
    console.log("🎉 location data obtained successfully successfully");
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("⚠️ error creating location table", err);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getLocations,
};
