import Activities from "./activites";
import Percentage from "./percentage";
import RandomActivities from "./random-activities";

function Dashboard() {
  return (
    <div className="activities_container">
      <Activities />
      <div className="dashboard">
        <div className="dash-top">
          <Percentage />
          <RandomActivities />
        </div>
        <div className="dash-bottom">
          <div className="input">
            <input className="act-input" type="text" placeholder="add to your activities..." />
            <button className="act-input-button">add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
