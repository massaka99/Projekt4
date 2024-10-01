import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { calculateBMI, calculateBMR, calculateDeficits } from "./utils";
import "./IntroSurvey.css";

function StepThree() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const weight = watch("weight" || undefined);
  const height = watch("height" || undefined);
  const age = watch("age" || undefined);
  const gender = watch("gender" || undefined);
  const wantedWeight = watch("wantedWeight" || undefined);
  const weeksToGoal = watch("weeksToGoal" || undefined);

  useEffect(() => {
    const bmiCurrent = calculateBMI(weight, height);
    const bmrCurrent = calculateBMR(gender, weight, height, age);
    const bmiAfter = calculateBMI(wantedWeight, height);
    const bmrAfter = calculateBMR(gender, wantedWeight, height, age);
    const { dailyCalorieDeficit, weeklyCalorieDeficit, goalDescription } =
      calculateDeficits(weight, wantedWeight, weeksToGoal);

    setValue("results.bmiCurrent", bmiCurrent);
    setValue("results.bmrCurrent", bmrCurrent);
    setValue("results.bmiAfter", bmiAfter);
    setValue("results.bmrAfter", bmrAfter);
    setValue("results.dailyCalorieDeficit", dailyCalorieDeficit);
    setValue("results.weeklyCalorieDeficit", weeklyCalorieDeficit);
    setValue("results.goalDescription", goalDescription);
  }, [setValue, weight, height, age, gender, wantedWeight, weeksToGoal]);

  return (
    <div className="survey-container">
      <div className="survey-form">
        <div className="form-group">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            placeholder="Enter your weight"
            {...register("weight", {
              required: true,
              min: { value: 30, message: "Minimum weight is 30 kg" },
              max: { value: 500, message: "Maximum weight is 500 kg" },
            })}
          />
          {errors.weight && (
            <p className="text-danger">{errors.weight.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            placeholder="Enter your height"
            {...register("height", {
              required: true,
              min: { value: 50, message: "Minimum height is 50 cm" },
              max: { value: 250, message: "Maximum height is 250 cm" },
            })}
          />
          {errors.height && (
            <p className="text-danger">{errors.height.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Desired Weight (kg)</label>
          <input
            type="number"
            placeholder="Enter your desired weight"
            {...register("wantedWeight", {
              required: true,
              min: { value: 30, message: "Minimum weight is 30 kg" },
              max: { value: 500, message: "Maximum weight is 500 kg" },
            })}
          />
          {errors.wantedWeight && (
            <p className="text-danger">{errors.wantedWeight.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Weeks to Goal</label>
          <input
            type="number"
            placeholder="Enter the number of weeks to your goal"
            {...register("weeksToGoal", {
              required: true,
              min: { value: 1, message: "Minimum is 1 week" },
              max: { value: 204, message: "Maximum is 204 weeks (4 years)" },
            })}
          />
          {errors.weeksToGoal && (
            <p className="text-danger">{errors.weeksToGoal.message}</p>
          )}
        </div>
        <div>
          <p className="form-result">
            Current BMI: {watch("results.bmiCurrent" || undefined)}
          </p>
          <p className="form-result">
            Current BMR: {watch("results.bmrCurrent" || undefined)} kcal
          </p>
          <p className="form-result">
            Expected BMI after weight change:{" "}
            {watch("results.bmiAfter" || undefined)}
          </p>
          <p className="form-result">
            Expected BMR after weight change:{" "}
            {watch("results.bmrAfter" || undefined)} kcal
          </p>
          <p className="form-result">
            Daily {watch("results.goalDescription" || undefined)}:{" "}
            {Math.abs(watch("results.dailyCalorieDeficit"))} kcal
          </p>
          <p className="form-result">
            Weekly {watch("results.goalDescription" || undefined)}:{" "}
            {Math.abs(watch("results.weeklyCalorieDeficit"))} kcal
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
