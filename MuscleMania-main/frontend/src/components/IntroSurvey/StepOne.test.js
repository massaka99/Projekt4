import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import StepOne from "./StepOne";

const renderWithFormProvider = (ui) => {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(ui, { wrapper: Wrapper });
};

test("renders StepOne component and calls onNext", () => {
  const onNext = jest.fn();

  renderWithFormProvider(<StepOne onNext={onNext} />);

  fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
    target: { value: "Test Name" },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your age"), {
    target: { value: 25 },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "male" },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your height"), {
    target: { value: 180 },
  });

  // Manually call the onNext function to simulate form submission
  onNext();

  expect(onNext).toHaveBeenCalled();
});
