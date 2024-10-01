import React, { useState } from "react";
import "./BMRCalculatorPage.css";

const BMRCalculatorPage = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmr, setBMR] = useState("");
  const [error, setError] = useState("");

  const calculateBMR = (e) => {
    e.preventDefault();
    if (!weight || !height || !age || !gender) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    let result;
    if (gender === "male") {
      result = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      result = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }
    setBMR(result.toFixed(2));
  };

  return (
    <div className="bmr-calculator-container">
      <h2>BMR Calculator</h2>
      <form onSubmit={calculateBMR}>
        <div className="input-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age in years"
            min="1"
            required
          />
        </div>
        <div className="input-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height in cm"
            min="1"
            required
          />
        </div>
        <div className="input-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight in kg"
            min="1"
            required
          />
        </div>
        <button type="submit" className="calculate-btn">
          Calculate
        </button>
        {error && <p className="error">{error}</p>}
        {bmr && (
          <div className="result">
            <h3>Your BMR: {bmr}</h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default BMRCalculatorPage;
