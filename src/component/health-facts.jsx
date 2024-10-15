import React, { useEffect, useState } from "react";
import axios from "axios";

function HealthFacts() {
  const [healthFacts, setHealthFacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const healthFactsResponse = await axios.get("http://localhost:5000/health-facts");
      setHealthFacts(healthFactsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!healthFacts.length) {
    return <div>Loading...</div>;
  }

  const { id, title, description, reference_author, reference_title, reference_source, challenge } = healthFacts[0] || {};

  return (
    <div className="health_facts">
      <div className="fact_container">
        <div className="today_fact">
          <h1>TODAY'S FACT !</h1>
          <p className="fact_title">{title}</p>
          <p className="fact_description">{description}</p>
        </div>
        <div className="health_article">
          <p className="publisher">{reference_author}</p>
          <p className="article_title">{reference_title}</p>
          <button className="article_button">
            <a href={reference_source} target="_blank" rel="noopener noreferrer">
              READ
            </a>
          </button>
        </div>
      </div>
      <div className="today_challenge">
        <div className="challenge_desc">
          <p className="title">Today Challenge :</p>
          <p className="challenge">{challenge}</p>
        </div>
        <button className="challenge_button">DONE</button>
      </div>
    </div>
  );
}

export default HealthFacts;
