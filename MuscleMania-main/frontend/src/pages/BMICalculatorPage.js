import React, { useState } from "react";
import "./BMICalculatorPage.css";

const BMICalculatorPage = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [category, setCategory] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (weight && height) {
      const result = (weight / (height / 100) ** 2).toFixed(2);
      setBMI(result);
      determineCategory(result);
    } else {
      alert("Please enter both your weight and height.");
    }
  };

  const determineCategory = (bmi) => {
    if (bmi < 18.5) {
      setCategory("Underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setCategory("Normal weight");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className="bmi-calculator-container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>
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
        <button type="submit" className="calculate-btn">
          Calculate
        </button>
        {bmi && (
          <div className="result">
            <h3>Your BMI: {bmi}</h3>
            <p>{category}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BMICalculatorPage;
