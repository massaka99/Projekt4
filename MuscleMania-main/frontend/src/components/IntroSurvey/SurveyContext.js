import React, { createContext, useContext, useState, useEffect } from "react";
import { checkSurveyCompletion } from '../../API/api';
import { useLogin } from "../../context/LoginContext"; 

const SurveyContext = createContext();

export const useSurvey = () => useContext(SurveyContext);

const fetchSurveyStatus = async (userId, isLoggedIn, setSurveyCompleted) => {
  console.log(`Checking if ${userId} has completed the survey`);

  if (!isLoggedIn) {
    console.error('User is not logged in.');
    return; 
  }

  if (!userId) {
    console.error('No user ID available. User might not be logged in.');
    return; 
  }

  try {
    const isSurveyDone = await checkSurveyCompletion(userId);
    console.log(`User ${userId} has ${isSurveyDone ? 'completed' : 'not completed'} the survey.`);
    setSurveyCompleted(isSurveyDone);
  } catch (error) {
    console.error('Failed to fetch survey completion status:', error);
  }
};

export const SurveyProvider = ({ children }) => {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const { userId, isLoggedIn } = useLogin();

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchSurveyStatus(userId, isLoggedIn, setSurveyCompleted);
    }
  }, [userId, isLoggedIn, setSurveyCompleted]);

  return (
    <SurveyContext.Provider value={{ surveyCompleted, setSurveyCompleted, fetchSurveyStatus: () => fetchSurveyStatus(userId, isLoggedIn, setSurveyCompleted) }}>
      {children}
    </SurveyContext.Provider>
  );
};
