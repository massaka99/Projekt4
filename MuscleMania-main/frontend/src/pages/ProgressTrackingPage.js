import React, { useState, useEffect } from "react";
import "./ProgressTrackingPage.css";
import { getUserData } from '../API/api'; // Import the API function to fetch user data
import { NewSession } from '../components/ProgressTracking/NewSession';
import ProgressDiagramPage from "../components/ProgressTracking/ProgressDiagramPage";

const ProgressTrackingPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [trainingDays, setTrainingDays] = useState(0);
  const [totalTrainingDays, setTotalTrainingDays] = useState(0);
  const [trainingPlan, setTrainingPlan] = useState("");
  const [userIdProxy, setUserIdProxy] = useState(null);

  const userId = 'currentUserId'; // Replace 'currentUserId' with actual logic to retrieve the logged-in user's ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id"); 
        const data = await getUserData(userId); //bruger funktion fra /api her 
        setUserData(data);
        const userData = await getUserData(userId);
        setTrainingDays(userData.trainingDays);
        setTotalTrainingDays(userData.totalTrainingDays);
        setTrainingPlan(userData.trainingPlan);
        setUserIdProxy(userId)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userId]);
  if (error) {
    return (
      <div className="progressTracking-container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="progressTracking-container">
        <h2>Indlæser data...</h2>
      </div>
    );
  }

  return (
    <div className="progress-container">
      <h1>MUSCLE MANIA</h1>
      <h2>Hej {userData.name}</h2>
      <p>Skulle vi lige få klaret dagens træning?</p>
      <div className="stats-and-session-wrapper">
      <div className="stats">
        <p>Dine Stats</p>
        <p>Kalorier: {userData.calories}/{userData.totalCalories}</p>
        <p>KG: {userData.weight} - BMI {userData.results.bmiCurrent}</p>
      </div>
      {/* <div className="plan">
        <p>Din Træningsplan</p>
        <p>{trainingPlan}</p>
      </div>
      <div className="training-days">
        <p>Træningsdage</p>
        <p>{trainingDays} af {totalTrainingDays}</p>
      </div> */}
      <div className="ny-session">
        <p>Træn NU</p>
        <NewSession userId={userIdProxy}/>
      </div>
      </div>
      <br></br>
      <div className="training-data">
        <ProgressDiagramPage userId={userIdProxy}/>
      </div>
    </div>
  );
};

export default ProgressTrackingPage;