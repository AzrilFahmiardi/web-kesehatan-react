function Percentage() {
  return (
    <div className="percentage">
      <button className="percentage-button previous">
        <img src="previous.png" alt="" />
      </button>
      <div className="percentage-rect">
        <div className="circle-container">
          <svg className="circle-progress" viewBox="0 0 150 150">
            <circle className="circle-bg" />
            <circle className="circle" id="progressCircle" />
            <text x="50%" y="50%" className="progress-percentage" dominantBaseline="middle" textAnchor="middle" id="percentageText" fill="#fff">
              0%
            </text>
          </svg>
          <div className="date-label">23 September 2024</div>
        </div>
      </div>
      <button className="percentage-button next">
        <img src="next2.png" alt="" />
      </button>
    </div>
  );
}

export default Percentage;
