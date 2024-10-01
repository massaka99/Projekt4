import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutPlansSelector from "./WorkoutPlansSelector";

// Mock data for workout plans
jest.mock("../../data/WorkoutPlans", () => [
  {
    id: 1,
    title: "Newbie Chill",
    difficulty: "Beginner",
    focusArea: "Mixed",
    duration: "Low",
    week: {
      Monday: [{ name: "Exercise1", reps: 10, sets: 4 }],
    },
  },
  {
    id: 2,
    title: "Intermediate Beast Mode",
    difficulty: "Intermediate",
    focusArea: "Strength",
    duration: "High",
    week: {
      Friday: [{ name: "Romanian Deadlift", reps: 10, sets: 4 }],
    },
  },
]);

test("should handle plan selection and call onPlanSelect", () => {
  const onPlanSelect = jest.fn();
  const userData = {
    fitnessLevel: "Beginner",
    focusArea: "Mixed",
  };

  render(
    <WorkoutPlansSelector userData={userData} onPlanSelect={onPlanSelect} />,
  );

  fireEvent.click(screen.getByText(/Newbie Chill/i));

  expect(onPlanSelect).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      title: "Newbie Chill",
      difficulty: "Beginner",
      focusArea: "Mixed",
      duration: "Low",
      week: {
        Monday: [{ name: "Exercise1", reps: 10, sets: 4 }],
      },
    }),
  );
});
