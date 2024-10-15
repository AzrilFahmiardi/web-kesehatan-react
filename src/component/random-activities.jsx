import React, { useEffect, useState } from "react";
import axios from "axios";

function RandomActivities() {
  const [randomActivities, setRandomActivities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const randomActivitiesResponse = await axios.get("https://web-kesehatan-react.onrender.com/random-activities");
      setRandomActivities(randomActivitiesResponse.data);
    } catch (error) {
      const randomActivitiesResponse = await axios.get("http://localhost:5000/random-activities");
      setRandomActivities(randomActivitiesResponse.data);
      console.error("Error fetching data:", error);
    }
  };

  if (!randomActivities.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rand-act">
      <div className="rand-container">
        <div className="rand-title">RECOMMENDATION</div>
        <div className="rand-list">
          <ul>
            {randomActivities.map((activity) => (
              <li key={activity.id}>
                <button id={`rand-${activity.id}`}>
                  <img src="plus.png" alt="Add activity" />
                </button>
                <label htmlFor={`rand-${activity.id}`}>{activity.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="rand-generate-button">
          <button onClick={fetchData}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default RandomActivities;
