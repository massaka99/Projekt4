// Typer af test man kan lave er:
// 1. Unit tests: Test af en enkelt funktion eller metode
// 2. Integration tests: Test af flere funktioner eller metoder sammen
// 3. End-to-end tests: Test af hele applikationen fra start
// 4. User interface tests: Test af brugergrænsefladen
// 5. Accessibility tests: Test af tilgængelighed
// 6. Performance tests: Test af applikationens ydeevne

// Værktøjer til test:
// 1. Jest: JavaScript test framework (Unit tests)
// 2. React Testing Library: Test React komponenter (Integration tests)
// 3. Cypress: End-to-end test framework
// 4. Axe, LightHouse: Accessibility testing tool
// 5. LightHouse, WebPageTest: Performance testing tool


import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/login/Register';
import useRegister from '../hooks/useRegister';

// Mock the useRegister hook
jest.mock('../hooks/useRegister');

describe('Register component', () => {
  let mockRegisterUser;

  beforeEach(() => {
    mockRegisterUser = jest.fn();
    useRegister.mockReturnValue({
      loading: false,
      error: null,
      registerUser: mockRegisterUser
    });
  });

  // Test 1: Test if the Register component renders
  test("renders Register component", () => {
    console.log("Register component renders successfully");
    render(<Register />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  // Test 2: Test if the Register component fills out form fields correctly
  test("fills out form fields correctly", async () => {
    console.log("Fills out form fields correctly");
    render(<Register />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));  

    await waitFor(() => {
      expect(screen.getByText(/Please enter your full name!/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Please input your email!/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Please enter your password!/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Please re-enter your password!/i)).toBeInTheDocument();
    });
  });

  // Test 3: Test if the Register component submits form with valid data
  test("submits form with valid data", async () => {
    console.log("Submits form with valid data");
    render(<Register />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password', { selector: 'input' }), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(
        {
          fullName: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        },
        expect.any(Function)
      );
    });
  });

  // Test 4: Test if the Register component shows error message on failed registration
  test("shows error message on failed registration", async () => {
    console.log("Shows error message on failed registration");
    useRegister.mockReturnValue({
      loading: false,
      error: 'Registration failed',
      registerUser: mockRegisterUser
    });

    render(<Register />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password', { selector: 'input' }), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
      console.error("Registration failed:", "Registration failed");
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });
  });
});