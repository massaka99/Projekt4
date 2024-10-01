import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../components/login/Forgotpassword';

describe('ForgotPassword component', () => {

    // Test 1: Test if the ForgotPassword component renders
    test('renders the form and handles password reset', async () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        // Fill in the email input
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Mock a successful password reset
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Password reset instructions have been sent to your email.' }),
        });

        // Simulate form submission
        fireEvent.click(screen.getByText('Reset Password'));

        // Wait for the success message to appear
        await waitFor(() => {
            expect(screen.getByText('Password reset instructions have been sent to your email.')).toBeInTheDocument();
        });

        // Ensure that the email input and submit button are still present after form submission
        await waitFor(() => {
            expect(screen.getByText('Email')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Reset Password')).toBeInTheDocument();
        });
    });

    // Test 2: Test form validation for invalid email input
    test('displays error message for invalid email input', async () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        // Fill in an invalid email input
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

        // Simulate form submission
        fireEvent.click(screen.getByText('Reset Password'));

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/The input is not valid Email!/i)).toBeInTheDocument();
        });
    });

    // Test 3: Test error handling for server errors
    test('displays error message for server error', async () => {
        // Mocking the fetch function to simulate a server error
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ message: 'Internal Server Error' }),
        });

        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        // Fill in a valid email input
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Simulate form submission
        fireEvent.click(screen.getByText('Reset Password'));

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/There has been a problem with your fetch operation:/i)).toBeInTheDocument();
        });
    });
});
