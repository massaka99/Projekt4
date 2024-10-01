import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import StepThree from "./StepThree";
import { calculateBMI, calculateBMR, calculateDeficits } from "./utils";

jest.mock("./utils");

const renderWithFormProvider = (ui) => {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(ui, { wrapper: Wrapper });
};

test("renders StepThree component and calculates BMI, BMR, and deficits", async () => {
  calculateBMI.mockReturnValue(25);
  calculateBMR.mockReturnValue(1500);
  calculateDeficits.mockReturnValue({
    dailyCalorieDeficit: 500,
    weeklyCalorieDeficit: 3500,
    goalDescription: "Weight loss",
  });

  renderWithFormProvider(<StepThree />);

  fireEvent.input(screen.getByPlaceholderText("Enter your weight"), {
    target: { value: 70 },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your height"), {
    target: { value: 170 },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your desired weight"), {
    target: { value: 65 },
  });
  fireEvent.input(
    screen.getByPlaceholderText("Enter the number of weeks to your goal"),
    {
      target: { value: 10 },
    },
  );

  expect(await screen.findByText("Current BMI: 25")).toBeInTheDocument();
  expect(await screen.findByText("Current BMR: 1500 kcal")).toBeInTheDocument();
  expect(
    await screen.findByText("Expected BMI after weight change: 25"),
  ).toBeInTheDocument();
  expect(
    await screen.findByText("Expected BMR after weight change: 1500 kcal"),
  ).toBeInTheDocument();
});
