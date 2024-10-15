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
  async function fetchData() {
    const localUrl = "http://localhost:5000";
    const deployUrl = "https://web-kesehatan-react.onrender.com";

    try {
      // Coba untuk mengambil data dari server deploy
      const [healthFactsResponse, activitiesResponse, randomActivitiesResponse] = await Promise.all([axios.get(`${deployUrl}/health-facts`), axios.get(`${deployUrl}/activities`), axios.get(`${deployUrl}/random-activities`)]);

      return {
        healthFacts: healthFactsResponse.data,
        activities: activitiesResponse.data,
        randomActivities: randomActivitiesResponse.data,
      };
    } catch (error) {
      console.error("Error fetching from deploy server:", error);

      // Jika ada error, coba untuk mengambil data dari server lokal
      try {
        const [healthFactsResponse, activitiesResponse, randomActivitiesResponse] = await Promise.all([axios.get(`${localUrl}/health-facts`), axios.get(`${localUrl}/activities`), axios.get(`${localUrl}/random-activities`)]);

        return {
          healthFacts: healthFactsResponse.data,
          activities: activitiesResponse.data,
          randomActivities: randomActivitiesResponse.data,
        };
      } catch (localError) {
        console.error("Error fetching from local server:", localError);
        throw new Error("Unable to fetch data from both servers");
      }
    }
  }

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
