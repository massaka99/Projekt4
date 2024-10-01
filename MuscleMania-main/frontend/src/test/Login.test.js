import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginProvider } from '../context/LoginContext'; 
import Login from '../components/login/Login'; 

// Mocking the useLogin and useNavigate hooks
global.fetch = jest.fn();
describe('Login Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    // Test 1: Test if the Login component renders
    test('renders the Login component', () => {
        render(
            <LoginProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </LoginProvider>
        );

        expect(screen.getByText(/Log in to your account/i)).toBeInTheDocument();
    });

    // Test 2: Test if the Login component fills out form fields correctly
    test('validates form fields', async () => {
        render(
            <LoginProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </LoginProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please input your email!/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Please input your password!/i)).toBeInTheDocument();
        });
    });

    // Test 3: Test if the Login component handles login successfully
    test('handles login successfully', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => 'mockUserId'
        });

        render(
            <LoginProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </LoginProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:4999/login', expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'john@example.com', password: 'password123' }),
            }));
        });
    });

    // Test 4: Test if the Login component handles login failure
    test('handles login failure', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Login failed' })
        });

        render(
            <LoginProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </LoginProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
        });
    });
});