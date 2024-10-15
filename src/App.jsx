import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./component/Header.jsx";
import HealthFacts from "./component/health-facts.jsx";
import Dashboard from "./component/dashboard.jsx";

function App() {
  const [healthFacts, setHealthFacts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [randomActivities, setRandomActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  // FETCH
  const fetchData = async () => {
    try {
      const [healthFactsResponse, activitiesResponse, randomActivitiesResponse] = await Promise.all([
        axios.get("http://localhost:5000/health-facts"),
        axios.get("http://localhost:5000/activities"),
        axios.get("http://localhost:5000/random-activities"),
      ]);

      setHealthFacts(healthFactsResponse.data);
      setActivities(activitiesResponse.data);
      setRandomActivities(randomActivitiesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddActivity = async () => {
    try {
      const response = await axios.post("http://localhost:5000/activities", { activity: newActivity });
      setNewActivity("");
      setActivities([...activities, response.data]);
    } catch (error) {
      console.error("Error adding activity: ", error);
    }
  };

  return (
    <>
      <Header />
      <HealthFacts />
      <Dashboard />

      <div>
        <h1>Data from Backend</h1>

        <h2>ADD ACTIVITIES</h2>
        <input id="activities-input" type="text" onChange={(e) => setNewActivity(e.target.value)} />
        <button id="add-act" onClick={handleAddActivity}>
          ADD
        </button>
        <h2>RANDOM ACTIVITIES</h2>
        <ul>
          {randomActivities.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
