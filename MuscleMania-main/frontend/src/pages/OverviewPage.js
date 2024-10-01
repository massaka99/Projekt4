import React from 'react';
import './OverviewPage.css'; // Sørg for at importere den nye CSS-fil

const OverviewPage = () => {
  const handleResetProgress = () => {
    console.log("Fremskridt nulstillet");
  };

  // Simuleret data for demonstration
  const data = {
    bodyWeight: { current: 70, history: [65, 66, 68, 69, 70] },
    squats: { current: 60, history: [50, 52, 55, 58, 60] },
    farmerWalk: { current: 70, history: [65, 67, 68, 69, 70] }
  };

  const renderBars = (history) => {
    return history.map((value, index) => (
      <div key={index} className="bar" style={{ height: `${value}%` }}></div>
    ));
  };

  return (
    <div className="overview-container">
      <h1>Overview</h1>
      <div className="progress-section">
        <h2>Kropsvægt</h2>
        <div className="progress-bar">
          {renderBars(data.bodyWeight.history)}
        </div>
      </div>
      <div className="progress-section">
        <h2>Squads</h2>
        <div className="progress-bar">
          {renderBars(data.squats.history)}
        </div>
      </div>
      <div className="progress-section">
        <h2>Farmer Walk</h2>
        <div className="progress-bar">
          {renderBars(data.farmerWalk.history)}
        </div>
      </div>
      <button onClick={handleResetProgress}>Opdater Fremskridt</button>
    </div>
  );
};

export default OverviewPage;