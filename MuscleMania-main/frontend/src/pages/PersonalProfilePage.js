import React, { useState, useEffect } from "react";
import "./PersonalProfilePage.css";
import { getUserData, saveUserData } from "../API/api";
import { useNavigate } from "react-router-dom";

const PersonalProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    weight: "",
    wantedWeight: "",
    age: "",
    fitnessLevel: "",
    email: "",
    focusArea: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      const data = await getUserData(userId);
      if (data) {
        setUserData(data);
        setFormData({
          weight: data.weight || "",
          wantedWeight: data.wantedWeight || "",
          age: data.age || "",
          fitnessLevel: data.fitnessLevel || "",
          email: data.email || "",
          focusArea: data.focusArea || "",
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      const updateResponse = await saveUserData(userId, formData);
      if (updateResponse) {
        await fetchUserData(); // Re-fetch user data
        setEditMode(false);
        alert("Changes saved successfully!");
        //navigate('/select-plan', { state: { userData: formData } });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setError("Failed to save changes: " + error.message);
    }
  };

  const cancelChanges = () => {
    // Reset form data to the original user data
    setFormData({
      weight: userData.weight || "",
      wantedWeight: userData.wantedWeight || "",
      age: userData.age || "",
      fitnessLevel: userData.fitnessLevel || "",
      email: userData.email || "",
      focusArea: userData.focusArea || "",
    });
    setEditMode(false);
  };

  if (error) {
    return (
      <div className="profile-container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <h2>Loading data...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {editMode ? (
        <>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight:</label>
            <input
              id="weight"
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="wantedWeight">Desired Weight:</label>
            <input
              id="wantedWeight"
              type="text"
              name="wantedWeight"
              value={formData.wantedWeight}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fitnessLevel">Fitness Level:</label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleInputChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="focusArea">Training Focus:</label>
            <select
              id="focusArea"
              name="focusArea"
              value={formData.focusArea}
              onChange={handleInputChange}
            >
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <button onClick={saveChanges} className="save-btn">
            Save Changes
          </button>
          <button onClick={cancelChanges} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="profile-header">Hello, {userData.name}!</h1>
          <h4>Here are your details:</h4>
          <p>Email: {userData.email}</p>
          <p>Your weight: {userData.weight}</p>
          <p>Your desired weight: {userData.wantedWeight}</p>
          <p>Your age: {userData.age}</p>
          <p>Your fitness level: {userData.fitnessLevel}</p>
          <p>Training Focus: {userData.focusArea}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default PersonalProfilePage;
