import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WorkoutModal from '../components/WorkoutModal/WorkoutModal';
import { updatePlanForUser } from '../API/api';
import toast from 'react-hot-toast';

// Mock API kald og toast
jest.mock('../API/api');
jest.mock('react-hot-toast');

const planMock = {
  title: 'Weekly Plan',
  week: {
    Monday: [
      { name: 'Push-up', sets: 3, reps: 15 },
      { name: 'Squat', sets: 3, reps: 20 },
    ],
    Tuesday: [
      { name: 'Pull-up', sets: 3, reps: 10 },
      { name: 'Lunge', sets: 3, reps: 12 },
    ],
  },
  videos: [
    { id: 'abc123', description: 'Push-up tutorial' },
    { id: 'def456', description: 'Squat tutorial' },
  ],
};

describe('WorkoutModal Component', () => {
  let originalConsoleError;
  let originalConsoleLog;

  beforeAll(() => {
    // Store original console methods
    originalConsoleError = console.error;
    originalConsoleLog = console.log;

    // Mock console methods
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterAll(() => {
    // Restore original console methods
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  test('renders without crashing', () => {
    render(<WorkoutModal plan={planMock} onClose={jest.fn()} />);

    expect(screen.getByText('Weekly Plan')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Push-up - 3 sets of 15')).toBeInTheDocument();
    expect(screen.getByText('Squat - 3 sets of 20')).toBeInTheDocument();
  });

  test('calls saveUserPlan when "Vælg og gem" button is clicked', async () => {
    const onCloseMock = jest.fn();
    updatePlanForUser.mockResolvedValue({ success: true });
    render(<WorkoutModal plan={planMock} onClose={onCloseMock} />);

    const saveButton = screen.getByText('Choose and save');
    fireEvent.click(saveButton);

    await waitFor(() => expect(updatePlanForUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Plan added'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('displays error toast when saveUserPlan fails', async () => {
    const onCloseMock = jest.fn();
    updatePlanForUser.mockRejectedValue(new Error('Failed to save'));
    render(<WorkoutModal plan={planMock} onClose={onCloseMock} />);

    const saveButton = screen.getByText('Choose and save');
    fireEvent.click(saveButton);

    await waitFor(() => expect(updatePlanForUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error saving'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('closes the modal when clicking on the backdrop or "Close" button', () => {
    const onCloseMock = jest.fn();
    render(<WorkoutModal plan={planMock} onClose={onCloseMock} />);

    const backdrop = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(backdrop);
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
