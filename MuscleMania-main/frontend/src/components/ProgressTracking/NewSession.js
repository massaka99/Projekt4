import React, { useState } from "react";
import './ProgressTracking.css';

export const NewSession = ({userId}) => {
    const [weekNumber, setWeekNumber] = useState();
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(1);
    const [reps, setReps] = useState(1);

    const handleClick = async (data) => {
        try {
            const url = `http://localhost:4999/session/${userId}`;
            const response = await fetch(url, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                weekNumber,
                exerciseName,
                sets,
                reps
              }),
            });
            if (!response.ok) {
                alert("Something went wrong!");
                throw new Error('Failed to submit new session');
              }
              alert("Godt Arbejde!");
              setExerciseName("");
              setSets(1);
              setReps(1);
              return await response.json();  // Antager at svaret indikerer succes
            } catch (error) {
              console.error('Error when submitting new Session:', error);
              throw error;
            }

    };
    const handleWeekNumberChange = (event) => {
        setWeekNumber(event.target.value);
      };
      const handleExerciseNameChange = (event) => {
        setExerciseName(event.target.value);
      };
      const handleSetsChange = (event) => {
        setSets(event.target.value);
      };
      const handleRepsChange = (event) => {
        setReps(event.target.value);
      };

    return (
        <div className="new-session">
            <div>
            <br />
            <label className="input-label">Uge nr.</label>
            <input
              className="input-field"
              type="number"
              min="1"
              placeholder="Uge nr."
              value={weekNumber}
              onChange={handleWeekNumberChange}
            />
            <br />
            <label className="input-label">Øvelse</label>
            <input
              className="input-field"
              type="text"
              placeholder="ex. Bench Press"
              value={exerciseName}
              onChange={handleExerciseNameChange}
            />
            <br />
            <label className="input-label">Antal Set</label>
            <input
              className="input-field"
              type="number"
              placeholder="Sets"
              min="1"
              value={sets}
              onChange={handleSetsChange}
            />
            <br />
            <label className="input-label">Antal Reps</label>
            <input
              className="input-field"
              type="number"
              placeholder="Reps"
              min="1"
              value={reps}
              onChange={handleRepsChange}
            />
            <br />
              <button className="submit-session-button" onClick={handleClick}>
                Tilføj ny Trænings Session
              </button>
          </div>
        </div>
    );
}