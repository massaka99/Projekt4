import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoModal from '../components/VideoModal/VideoModal';

// Mock video data til testning
const videosMock = [
  { id: 'abc123', description: 'Test video 1' },
  { id: 'def456', description: 'Another test video' },
];

describe('VideoModal Component', () => {
  // Test 1: Render Test
  test('renders uden at gå ned', () => {
    // Render VideoModal-komponenten med mock data
    render(<VideoModal videos={videosMock} onClose={jest.fn()} />);
    
    // Tjek om søgeinputfeltet er renderet
    expect(screen.getByPlaceholderText('Search Videos...')).toBeInTheDocument();
    // Tjek om videoerne er renderet
    expect(screen.getByText('Test video 1')).toBeInTheDocument();
    expect(screen.getByText('Another test video')).toBeInTheDocument();
  });

  // Test 2: Filter Test
  test('filtrerer videoer baseret på søgeinput', () => {
    // Render VideoModal-komponenten med mock data
    render(<VideoModal videos={videosMock} onClose={jest.fn()} />);
    
    // Hent søgeinputelementet
    const searchInput = screen.getByPlaceholderText('Search Videos...');
    
    // Simuler, at brugeren skriver 'another' i søgeinputtet
    fireEvent.change(searchInput, { target: { value: 'another' } });
    
    // Tjek om 'Test video 1' ikke vises
    expect(screen.queryByText('Test video 1')).not.toBeInTheDocument();
    // Tjek om 'Another test video' vises
    expect(screen.getByText('Another test video')).toBeInTheDocument();
  });

  // Test 3: Interaction Test
  test('lukker modalen, når der klikkes på baggrunden eller lukkeknappen', () => {
    // Mock onClose-funktionen
    const onCloseMock = jest.fn();
    // Render VideoModal-komponenten med mock data
    render(<VideoModal videos={videosMock} onClose={onCloseMock} />);
    
    // Hent baggrundselementet
    const backdrop = screen.getByRole('button', { name: /close/i });
    
    // Simuler, at brugeren klikker på baggrunden
    fireEvent.click(backdrop);
    // Tjek om onCloseMock er blevet kaldt én gang
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    // Hent lukkeknap-elementet
    const closeButton = screen.getByRole('button', { name: /close/i });
    // Simuler, at brugeren klikker på lukkeknappen
    fireEvent.click(closeButton);
    // Tjek om onCloseMock er blevet kaldt i alt to gange
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
