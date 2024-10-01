import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Make sure the path to App is correct
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is loaded
import { SurveyProvider } from "./components/IntroSurvey/SurveyContext";
import { LoginProvider } from './context/LoginContext.jsx'
import { Toaster } from 'react-hot-toast';

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <LoginProvider>
    <SurveyProvider>
      <App />
      <Toaster/>
    </SurveyProvider>
    </LoginProvider>
  </React.StrictMode>,
);
