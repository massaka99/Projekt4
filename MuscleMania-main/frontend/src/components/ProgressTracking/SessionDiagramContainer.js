import React, { useState, useEffect } from 'react';
import ProgressDiagram from './ProgressDiagram';
import './ProgressTracking.css';

function SessionDiagramContainer({ sessions }) {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    console.log("Effect triggered");
    if (sessions && sessions.length > 0) {
      const sessionsByExercise = sessions.reduce((acc, session) => {
        const { exerciseName, weekNumber, sets, reps } = session;

        if (!acc[exerciseName]) {
          acc[exerciseName] = [];
        }

        acc[exerciseName].push({ weekNumber, dataPoints: sets * reps });

        return acc;
      }, {});

      const exerciseDataArray = Object.entries(sessionsByExercise).map(([exerciseName, data]) => ({
        exerciseName,
        data
      }));
      
      setExerciseData(exerciseDataArray);
      console.log(exerciseDataArray);
    } else {
      // If sessions is null or empty, reset exerciseData
      console.log("Sessions is empty or null");
      setExerciseData([]);
    }
  }, [sessions]);

  return (
    <div>
      <div className='diagram-container'>
      {exerciseData.map((exercise, index) => (
        <div key={index}>
          <h3>{exercise.exerciseName}</h3>
          <ProgressDiagram exerciseDataPoints={exercise.data} />
        </div>
      ))}
      </div>
    </div>
  );
}

export default SessionDiagramContainer;
