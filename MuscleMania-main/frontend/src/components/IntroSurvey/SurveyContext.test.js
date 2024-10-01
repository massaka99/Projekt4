import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { SurveyProvider, useSurvey } from "./SurveyContext";
import { checkSurveyCompletion } from "../../API/api";
import { useLogin } from "../../context/LoginContext";

jest.mock("../../API/api");
jest.mock("../../context/LoginContext");

const TestComponent = () => {
  const { surveyCompleted, setSurveyCompleted, fetchSurveyStatus } = useSurvey();

  React.useEffect(() => {
    setSurveyCompleted(true);
  }, [setSurveyCompleted]);

  return (
      <div>
        <p>{surveyCompleted ? "Survey Completed" : "Survey Not Completed"}</p>
        <button onClick={fetchSurveyStatus}>Check Survey Status</button>
      </div>
  );
};

test("provides survey data and fetches survey status", async () => {
  useLogin.mockReturnValue({ userId: "123", isLoggedIn: true });
  checkSurveyCompletion.mockResolvedValue(true);

  await act(async () => {
    render(
        <SurveyProvider>
          <TestComponent />
        </SurveyProvider>
    );
  });

  expect(screen.getByText("Survey Completed")).toBeInTheDocument();

  const button = screen.getByText("Check Survey Status");
  fireEvent.click(button);

  await waitFor(() => {
    expect(checkSurveyCompletion).toHaveBeenCalledWith("123");
  });

  await waitFor(() => {
    expect(screen.getByText("Survey Completed")).toBeInTheDocument();
  });
});
