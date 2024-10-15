import React, { useEffect, useState } from "react";
import axios from "axios";

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const activitiesResponse = await axios.get("https://web-kesehatan-react.onrender.com/random-activities");
      setActivities(activitiesResponse.data);
    } catch (error) {
      const activitiesResponse = await axios.get("http://localhost:5000/activities");
      setActivities(activitiesResponse.data);
      console.error("Error fetching data:", error);
    }
  };

  if (!activities.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="your-list">
      <div className="title-list">
        <p>YOUR ACTIVITIES</p>
      </div>
      <div className="act-list">
        <ul className="task-list">
          {activities.map((activity) => (
            <li className="list-item" key={activity.id}>
              <input type="checkbox" id={activity.id} className="form-check-input" />
              <label htmlFor={activity.id} className="list-lable">
                {activity.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
