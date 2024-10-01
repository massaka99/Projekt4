import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectPlanModal from "./SelectPlanModal";
import { updatePlanForUser } from "../../API/api";
import { MemoryRouter } from "react-router-dom";
import toast from "react-hot-toast";

jest.mock("../../API/api");
jest.mock("react-hot-toast");

const plan = {
  title: "Test Plan",
  week: {
    Monday: [{ name: "Exercise 1" }, { name: "Exercise 2" }],
    Tuesday: [{ name: "Exercise 3" }],
  },
};

describe("SelectPlanModal", () => {
  const userID = "test-user-id";

  beforeEach(() => {
    sessionStorage.setItem("user_id", userID);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  test("renders the modal with plan details and handles plan selection", async () => {
    updatePlanForUser.mockResolvedValue({});
    toast.success.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <SelectPlanModal plan={plan} onClose={jest.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Plan")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Exercise 1")).toBeInTheDocument();
    expect(screen.getByText("Exercise 2")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Exercise 3")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Choose and Save"));

    expect(updatePlanForUser).toHaveBeenCalledWith(userID, plan);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Plan chosen and saved.");
    });
  });

  test("closes the modal when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter>
        <SelectPlanModal plan={plan} onClose={onClose} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });
});
