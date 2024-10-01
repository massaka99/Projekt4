//SurveyFormPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import StepOne from "../components/IntroSurvey/StepOne";
import StepTwo from "../components/IntroSurvey/StepTwo";
import StepThree from "../components/IntroSurvey/StepThree";
import "../components/IntroSurvey/IntroSurvey.css";
import { markSurveyCompleted, saveUserData } from "../API/api";
import { useSurvey } from "../components/IntroSurvey/SurveyContext";

function SurveyForm() {
  const methods = useForm();
  const navigate = useNavigate();
  const { fetchSurveyStatus } = useSurvey();
  const [step, setStep] = React.useState(1);

  const handleNext = async () => {
    const isLastStep = step === 3;
    const result = await methods.trigger();
    if (result && !isLastStep) {
      setStep((prevStep) => prevStep + 1);
    } else if (isLastStep && result) {
      await methods.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data) => {
    const userId = sessionStorage.getItem("user_id");
    console.log("Data to be submitted: ", data);
    try {
      if (!userId) {
        throw new Error("Missing user ID");
      }
      // Save user data
      const saveResult = await saveUserData(userId, data);
      console.log("Result of saveUserData API call", saveResult);

      // Mark survey as completed
      const markResult = await markSurveyCompleted(userId);
      console.log("Result of markSurveyCompleted API call", markResult);

      // Fetch survey status to ensure proper update
      await fetchSurveyStatus();

      console.log("Navigating to /select-plan");
      navigate("/select-plan", { state: { userData: data } });
    } catch (error) {
      console.error("Error submitting user data:", error);
      alert("Error Collecting Data, try again");
      navigate("/home", { state: { userData: data } });
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <FormProvider {...methods}>
      <h1 className="title">Answer the survey</h1>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="survey-form">
        {" "}
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        <div className="button-container">
          {step > 1 && (
            <button className="survey-button" type="button" onClick={prevStep}>
              Back
            </button>
          )}
          {step < 3 && (
            <button
              className="survey-button"
              type="button"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button className="survey-button" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default SurveyForm;
