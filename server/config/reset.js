import { pool } from "./database.js";
import { locations } from "../data/locationData.js";
import { events } from "../data/eventData.js";

export const createLocationTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS location;

    CREATE TABLE IF NOT EXISTS location (
        location_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        street_name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,  
        postal_code NUMERIC(100, 2) NOT NULL,
        country VARCHAR(255) NOT NULL,
        longitude NUMERIC(100, 2) NOT NULL,
        latitude NUMERIC(100, 2) NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 location table created successfully");
  } catch (err) {
    console.error("⚠️ error creating location table", err);
  }
};

const seedLocationTable = async () => {
  await createLocationTable();

  locations.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO location (name, description, street_name, city, postal_code, country, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };

    const values = [
      location.name,
      location.description,
      location.street_name,
      location.city,
      location.postal_code,
      location.country,
      location.longitude,
      location.latitude,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location data", err);
        return;
      }

      console.log(`✅ ${location.name} added successfully`);
    });
  });
};

export const createEventTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS event;
  
      CREATE TABLE IF NOT EXISTS event (
          event_id SERIAL PRIMARY KEY,
          location INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          event_time_seconds NUMERIC(100, 2) NOT NULL,
          CONSTRAINT fk_location
            FOREIGN KEY(location) 
                REFERENCES location(location_id)
      )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 event table created successfully");
  } catch (err) {
    console.error("⚠️ error creating event table", err);
  }
};

const seedEventTable = async () => {
  events.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO event (name, description, event_time_seconds, location) VALUES ($1, $2, $3, $4)",
    };

    const values = [
      event.name,
      event.description,
      event.event_time_seconds,
      event.location,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting events", err);
        return;
      }

      console.log(`✅ ${event.name} added successfully`);
    });
  });
};

// seedLocationTable();
createEventTable();
seedEventTable();
