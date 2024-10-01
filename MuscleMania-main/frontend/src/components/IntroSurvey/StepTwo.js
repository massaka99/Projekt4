import React from "react";
import { useFormContext } from "react-hook-form";
import "./IntroSurvey.css";

const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="survey-container">
      <div className="survey-form">
        <div className="form-group">
          <label className="form-label">Fitness level</label>
          <select
            {...register("fitnessLevel", {
              required: "Please select your current fitness level",
            })}
          >
            <option value="">Select fitness level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.fitnessLevel && (
            <p className="text-danger">{errors.fitnessLevel.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Your training goal</label>
          <select
            {...register("focusArea", {
              required: "What is your training goal?",
            })}
          >
            <option value="">Select goal</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Mixed">Mixed</option>
          </select>
          {errors.focusArea && (
            <p className="text-danger">{errors.focusArea.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Desired weekly workouts</label>
          <select
            {...register("desiredWeeklyWorkouts", {
              required: "Specify how many times you want to train per week.",
            })}
          >
            <option value="">Select number</option>
            <option value="1-2">1-2 times a week</option>
            <option value="3-4">3-4 times a week</option>
            <option value="5-6">5-6 times a week</option>
          </select>
          {errors.desiredWeeklyWorkouts && (
            <p className="text-danger">
              {errors.desiredWeeklyWorkouts.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
