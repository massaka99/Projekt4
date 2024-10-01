const BASE_URL = 'http://localhost:4999'; // Base URL for your API

export const saveUserData = async (userId, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateUser/${userId}`, { // Brug faktiske userId her
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Failed to save user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in saveUserData:', error);
    throw error;
  }
};

export const markSurveyCompleted = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/survey/complete/${userId}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to mark survey as completed');
    }
    return await response.json();  // Antager at svaret indikerer succes
  } catch (error) {
    console.error('Error in markSurveyCompleted:', error);
    throw error;
  }
};


export const checkSurveyCompletion = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/surveyStatus/${userId}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch survey status');
    }
    const data = await response.json();
    return data.surveyCompleted;  //true/false tilbage
  } catch (error) {
    console.error('Error in checkSurveyCompletion:', error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getUserData:', error);
    throw error;
  }
};

//bruges til plan-select for at gemme brugerens workoutPlan
export const updatePlanForUser = async (userId, plan) => {
  try {
    const response = await fetch(`${BASE_URL}/user/plan/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan })
    });

    if (!response.ok) {
      throw new Error(`Failed to update user plan: ${response.status}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error in updatePlanForUser:', error);
    throw error;
  }
};

