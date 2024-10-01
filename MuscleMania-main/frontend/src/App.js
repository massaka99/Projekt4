import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSurvey } from "./components/IntroSurvey/SurveyContext";
import NavBar from "./components/NavBar/NavBar";
import SurveyFormPage from "./pages/SurveyFormPage";
import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import PersonalProfilePage from "./pages/PersonalProfilePage";
import RecipeGeneratorPage from "./pages/RecipeGeneratorPage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";
import BMICalculatorPage from "./pages/BMICalculatorPage";
import BMRCalculatorPage from "./pages/BMRCalculatorPage";
import WorkoutPlansSelectorPage from "./pages/WorkoutPlansSelectorPage";
import Register from './components/login/Register';
import Login from './components/login/Login';
import OverviewPage from './pages/OverviewPage';
import { useLogin } from './context/LoginContext';
import ForgotPassword from './components/login/Forgotpassword';
import ResetPassword from './components/login/ResetPassword';
import StartPage from "./pages/startPage";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";


import "./App.css";

const App = () => {
  const { surveyCompleted } = useSurvey();
  const { isLoggedIn } = useLogin();

  console.log("Logged In:", isLoggedIn, "Survey Completed:", surveyCompleted);

  //skift path/ tilbage til dette: <Route path="/" element={ <StartPage />} />
  return (
    <Router>
      {isLoggedIn && surveyCompleted && <NavBar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={isLoggedIn ? surveyCompleted ? <HomePage /> : <Navigate to="/survey" /> : <Navigate to="/login" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/survey" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home" />} />
        <Route path="/forgot-password" element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/login" />} />
        <Route path="/reset-password" element={!isLoggedIn ? <ResetPassword /> : <Navigate to="/login" />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/survey" element={isLoggedIn ? (surveyCompleted ? <Navigate to="/select-plan" /> : <SurveyFormPage />) : <Navigate to="/login" />} />
        <Route path="/select-plan" element={isLoggedIn ? <WorkoutPlansSelectorPage /> : <Navigate to="/login" />} />
        <Route path="/workouts" element={isLoggedIn ? <WorkoutPage /> : <Navigate to="/login" />} />
        <Route path="/personal-profile" element={isLoggedIn ? <PersonalProfilePage /> : <Navigate to="/login" />} />
        <Route path="/RecipeGenerator" element={isLoggedIn ? <RecipeGeneratorPage /> : <Navigate to="/login" />} />
        <Route path="/progress-tracking" element={isLoggedIn ? <ProgressTrackingPage /> : <Navigate to="/login" />} />
        <Route path="/bmi-calculator" element={isLoggedIn ? <BMICalculatorPage /> : <Navigate to="/login" />} />
        <Route path="/bmr-calculator" element={isLoggedIn ? <BMRCalculatorPage /> : <Navigate to="/login" />} />
        <Route path="/overview" element={isLoggedIn ? <OverviewPage /> : <Navigate to="/login" />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
