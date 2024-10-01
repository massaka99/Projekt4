import React, { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import "./WorkoutModal.css";
import { updatePlanForUser } from "../../API/api";
import toast from 'react-hot-toast';

const WorkoutModal = ({ plan, onClose }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const saveUserPlan = async (plan) => {
    try {
      const userID = sessionStorage.getItem("user_id");
      await updatePlanForUser(userID, plan);
      toast.success('Plan added');
      onClose();
    } catch (error) {
      console.error('Error saving the user plan:', error);
      toast.error('Error saving');
    }
  };

  if (!plan || !plan.week) return null;

  const renderDayPlan = (day, exercises) => (
    <div key={day} className="daily-plan">
      <h3>{day}</h3>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.sets} sets of {exercise.reps}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="workout-modal-backdrop" onClick={onClose}>
        <div className="workout-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{plan.title}</h2>
          <div className="weekly-schedule">
            {Object.entries(plan.week).map(([day, exercises]) => renderDayPlan(day, exercises))}
          </div>
          <div className="modal-buttons">
            <button onClick={() => saveUserPlan(plan)}>Choose and save</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      {videoModalOpen && (
        <VideoModal
          videos={plan.videos}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </>
  );
};

export default WorkoutModal;
