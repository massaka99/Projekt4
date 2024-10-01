import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useLogout } from '../../context/LoginContext'

const NavBar = () => {
  const { logout } = useLogout();
  
  return (
    <nav className="nav-bar">
      <NavLink exact to="/home" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/workouts" activeClassName="active">
        Workoutplans
      </NavLink>
      <NavLink to="/RecipeGenerator" activeClassName="active">
        AI
      </NavLink>
      <NavLink to="/progress-tracking" activeClassName="active">
        Progress
      </NavLink>
      <NavLink to="/bmi-calculator" activeClassName="active">
        BMI Calculator
      </NavLink>
      <NavLink to="/bmr-calculator" activeClassName="active">
        BMR Calculator
      </NavLink>
      <NavLink to="/personal-profile" activeClassName="active">
        Profile
      </NavLink>
      <button onClick={logout} className="logout-button">
        Sign Out
      </button>
    </nav>
  );
};

export default NavBar;
