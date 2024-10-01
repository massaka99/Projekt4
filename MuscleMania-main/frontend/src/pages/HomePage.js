import React, { useEffect, useState } from "react";
import { getUserData } from '../API/api';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";

const HomePage = () => {
  const [userData, setUserData] = useState({});
  const userId = sessionStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.warn('No userId found in sessionStorage');
      return;
    }

    getUserData(userId)
      .then(data => {
        if (!data.name) {
          console.warn('User data fetched but name is missing:', data);
        }
        setUserData(data);
      })
      .catch(error => {
        console.error('Failed to load user data:', error);
      });

    // Add 'finished' class to typing elements after typing animation
    const typingElements = document.querySelectorAll('.typing-effect');
    setTimeout(() => {
      typingElements.forEach(el => el.classList.add('finished'));
    }, 3500); // Duration of typing animation in ms

  }, [userId]);

  return (
    <div className="homepage">
      <header className="header-section">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1 className="home-header typing-effect">Welcome to MuscleMania</h1>
          <h2 className="user-greeting typing-effect">Welcome back, {userData.name || 'Guest'}</h2>
          <p className="typing-effect">Get started with our personalized fitness plans and expert tips.</p>
          <button className="cta-button" onClick={() => navigate('/workouts')}>Get Started</button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
