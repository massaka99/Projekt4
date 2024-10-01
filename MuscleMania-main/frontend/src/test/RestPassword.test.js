import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "../components/login/ResetPassword";

// Mock fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ resetToken: "mockToken" }),
    })
);

describe("ResetPassword component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Test if the ResetPassword component renders
    test("renders ResetPassword component", () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/Reset Password/i)[0]).toBeInTheDocument();
    });

    // Test 2: Test if the ResetPassword component validates form fields
    test("validates form fields in ResetPassword component", async () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        // Click the Reset Password button without filling out any fields
        fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

        // Wait for validation error messages to appear
        await waitFor(() => {
            expect(screen.getByText(/Please input your email!/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Please input your reset token!/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Please input your new password!/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Please confirm your new password!/i)).toBeInTheDocument();
        });

    });


    // Test 3: Test if the ResetPassword component handles form submission successfully
    test("handles form submission successfully in ResetPassword component", async () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        fetch.mockResolvedValueOnce({
            ok: true,
        });


        // Fill out the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your reset token'), { target: { value: 'mockToken' } });
        fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'newPassword' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'newPassword' } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

        // Wait for the success message to appear
        await waitFor(() => {
            const successAlerts = screen.getAllByRole('alert', { type: 'success' });
            successAlerts.forEach(alert => {
                expect(alert).toBeInTheDocument();
            });
        });
    });

    // Test 4: Test if the ResetPassword component handles form submission failure
    test("handles form submission failure in ResetPassword component", async () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        // Mocking a failed response from the server
        fetch.mockRejectedValueOnce(new Error("Error resetting password"));

        // Fill out the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your reset token'), { target: { value: 'mockToken' } });
        fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'newPassword1' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'newPassword2' } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorAlert = screen.getAllByRole('alert', { type: 'error' });
            errorAlert.forEach(alert => {
                expect(alert).toBeInTheDocument();
            });

        });
    });

    // Test 5: Test if the ResetPassword component handles missing or invalid reset token
    test("handles missing or invalid reset token in ResetPassword component", async () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        // Mocking a failed response from the server due to missing or invalid reset token
        fetch.mockRejectedValueOnce(new Error("Invalid or missing reset token"));

        // Fill out the form fields (except reset token)
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'newPassword1' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'newPassword2' } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorAlert = screen.getByRole('alert', { type: 'error' });
            expect(errorAlert).toBeInTheDocument();
        });
    });

    // Test 6: Test if the ResetPassword component handles password reset error
    test("handles password reset error in ResetPassword component", async () => {
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        // Mocking a failed response from the server during password reset
        fetch.mockRejectedValueOnce(new Error("Passwords do not match"));

        // Fill out the form fields
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your reset token'), { target: { value: 'mockToken' } });
        fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'newPassword1' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'newPassword2' } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            const errorAlerts = screen.getAllByRole('alert', { type: 'error' });
            expect(errorAlerts.length).toBeGreaterThan(0); 
            errorAlerts.forEach(errorAlert => {
                expect(errorAlert.textContent).toContain('Passwords do not match'); 
            });
        });
    });

});
