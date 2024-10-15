const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// ALL
app.get("/", (req, res) => {
  try {
    res.send("OK").status(500);
  } catch (error) {
    console.error();
  }
});

// HEALTH FACTS
app.get("/health-facts", (req, res) => {
  index = Math.floor(Math.random() * 10) + 1;
  db.query("SELECT * FROM health_facts WHERE id=?", [index], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

// TODAYS ACTIVITIES
app.get("/activities", (req, res) => {
  db.query("SELECT * FROM activities where date_index=1", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

// RANDOM ACTIVITIES
app.get("/random-activities", (req, res) => {
  index = Math.floor(Math.random() * 6) + 1;
  db.query("SELECT * FROM recomendation_activities ORDER BY RAND() LIMIT 3", [index], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.post("/activities", (req, res) => {
  const { activity } = req.body;
  date_index = 1;
  is_done = 0;

  db.query("INSERT INTO activities (name,is_done,date_index) VALUES(?,?,?)", [activity, is_done, date_index], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal server Error");
    }
    res.status(201).json({ id: result.insertId, activity, is_done, date_index });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
