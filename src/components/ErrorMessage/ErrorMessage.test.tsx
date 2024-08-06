import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorMessage from './ErrorMessage';

const mockReload = jest.fn();

describe('ErrorMessage component', () => {
  const description = 'Something went wrong...';

  beforeEach(() => {
    const location = {
      reload: mockReload,
    };

    Object.defineProperty(window, 'location', {
      value: location,
      writable: true,
    });

    mockReload.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders ErrorMessage with the correct description', () => {
    render(<ErrorMessage description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('calls window.location.reload when the button is clicked', () => {
    render(<ErrorMessage description={description} />);
    const button = screen.getByText('Try again');
    act(() => { fireEvent.click(button)});
    expect(mockReload).toHaveBeenCalled();
  });

  it('handles try again button click', () => {
    const description = 'An error occurred';
    render(<ErrorMessage description={description} />);
    act(() => { fireEvent.click(screen.getByText('Try again')) });
    expect(mockReload).toHaveBeenCalled();
  });
});
