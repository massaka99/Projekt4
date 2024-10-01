import React, { useState, useEffect } from "react";
import workoutPlans from "../../data/WorkoutPlans";
import "./WorkoutPlansSelector.css";

const WorkoutPlansSelector = ({ userData, onPlanSelect }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const matchedPlans = matchWorkoutPlans(workoutPlans, userData);
    setPlans(matchedPlans);
  }, [userData]);

  const matchWorkoutPlans = (plans, userData) => {
    return plans
      .map((plan) => {
        let score = 0;
        if (
          plan.difficulty.toLowerCase() === userData.fitnessLevel.toLowerCase()
        ) {
          score += 2;
        }
        if (plan.focusArea.toLowerCase() === userData.focusArea.toLowerCase()) {
          score += 3;
        }
        return { ...plan, score };
      })
      .sort((a, b) => b.score - a.score);
  };

  const handlePlanSelect = (plan) => {
    onPlanSelect(plan);
  };

  return (
    <div className="workout-plan-selector">
      <h1 className="title">Select Your training plan.</h1>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="workout-plan"
          onClick={() => handlePlanSelect(plan)}
        >
          <h4>{plan.title}</h4>
          <p>Difficulty: {plan.difficulty}</p>
          <p>Focus Area: {plan.focusArea}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlansSelector;
