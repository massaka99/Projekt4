import React, { useState } from "react";
import SessionDiagramContainer from "./SessionDiagramContainer";
import './ProgressTracking.css';

const ProgressDiagramPage = ({userId}) => {
    const [allUserSessions, setAllUserSessions] = useState(null);
    const handleClick = async () => {
        try {
            const url = `http://localhost:4999/session/${userId}`;
            const response = await fetch(url, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!response.ok) {
                alert("Something went wrong!");
                throw new Error('Failed to get sessions');
              }
              const data = await response.json();
              setAllUserSessions(data);  // Antager at svaret indikerer succes
            } catch (error) {
              console.error('Error when submitting getting Sessions:', error);
              throw error;
            }
    };
    
    return (
        <div className="ProgressDiagramPage">
            <button className="get-data-button" onClick={handleClick} >Hent Trænings data </button>
            <SessionDiagramContainer sessions={allUserSessions}/>
        </div>
    );

};

export default ProgressDiagramPage;
