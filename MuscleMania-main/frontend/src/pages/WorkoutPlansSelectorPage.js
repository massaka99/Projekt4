import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkoutPlanSelector from "../components/IntroSurvey/WorkoutPlansSelector";
import SelectPlanModal from "../components/IntroSurvey/SelectPlanModal";

const WorkoutPlansSelectorPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!userData) {
      console.log("No user data available, please complete the survey first.");
      navigate("/home");
    }
  }, [userData, navigate]);

  return (
    <div>
      {userData && (
        <WorkoutPlanSelector
          userData={userData}
          onPlanSelect={setSelectedPlan}
        />
      )}
      {selectedPlan && <SelectPlanModal plan={selectedPlan} />}
    </div>
  );
};

export default WorkoutPlansSelectorPage;
