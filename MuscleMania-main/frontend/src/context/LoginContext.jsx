import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userId) => {
        console.log("Logging in with user ID:", userId); // Tjek hvad du faktisk får her
        setUserId(userId);
        setIsLoggedIn(true); // Brugeren er nu logget ind
    };


    const logout = () => {
        sessionStorage.removeItem('user_id'); // Fjern brugerens ID fra sessionstorage
        setUserId(null);
        setIsLoggedIn(false); // Brugeren er nu logget ud
    };

    return (
        <LoginContext.Provider value={{ userId, isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
export const useLogout = () => useContext(LoginContext);
