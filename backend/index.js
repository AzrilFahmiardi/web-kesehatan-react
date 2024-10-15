const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// HEALTH FACTS
app.get("/health-facts", async (req, res) => {
  const index = Math.floor(Math.random() * 10) + 1;
  try {
    const [results] = await db.query("SELECT * FROM health_facts WHERE id=?", [index]);
    res.json(results);
  } catch (error) {
    console.error("Query error: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

// TODAYS ACTIVITIES
app.get("/activities", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM activities WHERE date_index=1");
    res.json(results);
  } catch (error) {
    console.error("Query error: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

// RANDOM ACTIVITIES
app.get("/random-activities", async (req, res) => {
  const index = Math.floor(Math.random() * 6) + 1;
  try {
    const [results] = await db.query("SELECT * FROM recomendation_activities ORDER BY RAND() LIMIT 3");
    res.json(results);
  } catch (error) {
    console.error("Query error: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

// POST ACTIVITIES
app.post("/activities", async (req, res) => {
  const { activity } = req.body;
  const date_index = 1;
  const is_done = 0;

  try {
    const [result] = await db.query("INSERT INTO activities (name, is_done, date_index) VALUES (?, ?, ?)", [activity, is_done, date_index]);
    res.status(201).json({ id: result.insertId, activity, is_done, date_index });
  } catch (error) {
    console.error("Insert error: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
