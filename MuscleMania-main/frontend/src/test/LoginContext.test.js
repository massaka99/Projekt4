import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginProvider, useLogin } from '../context/LoginContext'; 

// The component that uses the useLogin hook
const LoggedInUserDisplay = () => {
    const { userId, isLoggedIn, login, logout } = useLogin();
    
    return (
      <div>
        <p>User ID: {userId ? userId : 'Not logged in'}</p>
        <p>Logged in: {String(isLoggedIn)}</p>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => login('mockUserId')}>Login</button>
        )}
      </div>
    );
  }; 
  
  // Mocking the useLogin hook
jest.mock('../context/LoginContext', () => ({
    ...jest.requireActual('../context/LoginContext'),
    useLogin: jest.fn(),
  }));
  
  describe('LoginContext', () => {
    beforeEach(() => {
      useLogin.mockClear();
    });
  
    test('Login User', async () => {
      // Mock the implementation of useLogin hook for not logged in user
      const mockLogin = jest.fn();
      const mockLogout = jest.fn();
      useLogin.mockReturnValue({
        userId: null,
        isLoggedIn: false,
        login: mockLogin,
        logout: mockLogout,
      });
  
      render(
        <LoginProvider>
          <MemoryRouter>
            <LoggedInUserDisplay />
          </MemoryRouter>
        </LoginProvider>
      );
  
      // Initial assertion - User is not logged in
      expect(screen.getByText(/User ID:/i)).toHaveTextContent('Not logged in');
      expect(screen.getByText(/Logged in:/i)).toHaveTextContent('false');
  
      // Simulate logging in by clicking the login button
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  
      // Expect that the login function is called when the login button is clicked
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('mockUserId');
    });
  
    test('Logout User', async () => {
      const mockLogin = jest.fn();
      const mockLogout = jest.fn();
      useLogin.mockReturnValue({
        userId: 'mockUserId',
        isLoggedIn: true,
        login: mockLogin,
        logout: mockLogout,
      });
  
      render(
        <LoginProvider>
          <MemoryRouter>
            <LoggedInUserDisplay />
          </MemoryRouter>
        </LoginProvider>
      );
      
      // Initial assertion - User is logged in
      expect(screen.getByText(/User ID:/i)).toHaveTextContent('mockUserId');
      expect(screen.getByText(/Logged in:/i)).toHaveTextContent('true');
  
      // Simulate logging out by clicking the logout button
      fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
  
      // Expect that the logout function is called when the logout button is clicked
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });