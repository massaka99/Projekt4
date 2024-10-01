import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import StepTwo from "./StepTwo";

const renderWithFormProvider = (ui) => {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(ui, { wrapper: Wrapper });
};

test("renders StepTwo component and handles inputs", () => {
  renderWithFormProvider(<StepTwo />);

  fireEvent.change(screen.getAllByRole("combobox")[0], {
    target: { value: "beginner" },
  });
  fireEvent.change(screen.getAllByRole("combobox")[1], {
    target: { value: "Cardio" },
  });
  fireEvent.change(screen.getAllByRole("combobox")[2], {
    target: { value: "3-4" },
  });

  expect(screen.getAllByRole("combobox")[0].value).toBe("beginner");
  expect(screen.getAllByRole("combobox")[1].value).toBe("Cardio");
  expect(screen.getAllByRole("combobox")[2].value).toBe("3-4");
});
