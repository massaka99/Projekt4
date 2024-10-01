import React from "react";
import { useFormContext } from "react-hook-form";
import "./IntroSurvey.css";

function StepOne({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="survey-container">
      <div onSubmit={handleSubmit(onNext)} className="survey-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^.{1,30}$/,
                message: "Name must be between 1-30 characters",
              },
            })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter your age"
            {...register("age", {
              required: "Age is required",
              min: {
                value: 10,
                message: "Minimum age is 10",
              },
              max: {
                value: 110,
                message: "Maximum age is 110",
              },
            })}
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Gender</label>
          <select {...register("gender", { required: "Select your gender" })}>
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-danger">{errors.gender.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            placeholder="Enter your height"
            {...register("height", {
              required: "Height is required",
              min: {
                value: 50,
                message: "Minimum height is 50 cm",
              },
              max: {
                value: 250,
                message: "Maximum height is 250 cm",
              },
            })}
          />
          {errors.height && (
            <p className="text-danger">{errors.height.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepOne;
