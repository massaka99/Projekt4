import React from "react";
import WorkoutGrid from "../components/WorkoutGrid/WorkoutGrid";
import "./WorkoutPage.css";

const WorkoutPage = () => {
  return (
    <div className="workout-container">
      <h1 className="workout-header">Your customized training plans</h1>
      <p className="workout-description">Following our smart algorithm, we recommend the training plan you see jumping as your current plan</p>
      <WorkoutGrid />
    </div>
  );
};

export default WorkoutPage;
