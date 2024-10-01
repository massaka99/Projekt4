import React from "react";
import { useNavigate } from "react-router-dom";
import { updatePlanForUser } from "../../API/api";
import toast from "react-hot-toast";
import "./SelectPlanModal.css";

const SelectPlanModal = ({ plan, onClose }) => {
  const navigate = useNavigate();

  const saveUserPlan = async (plan) => {
    try {
      const userID = sessionStorage.getItem("user_id");
      const updatedUser = await updatePlanForUser(userID, plan);

      console.log("User plan added with success", updatedUser);
      toast.success("Plan chosen and saved.");
      navigate("/home");
    } catch (error) {
      console.error("Error saving the user plan:", error);
      toast.error("Error with saving plan, please try again.");
    }
  };

  if (!plan || !plan.week) return null;

  return (
    <>
      <div className="workout-modal-backdrop" onClick={onClose}>
        <div className="workout-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{plan.title}</h2>
          <div className="weekly-schedule">
            {Object.entries(plan.week).map(([day, exercises], index) => (
              <div key={index} className="daily-plan">
                <h3>{day}</h3>
                <ul>
                  {exercises.map((exercise, exerciseIndex) => (
                    <li key={exerciseIndex}>{exercise.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={() => saveUserPlan(plan)}>Choose and Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default SelectPlanModal;
