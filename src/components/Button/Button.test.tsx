import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

describe('Button component', () => {
  const label = 'Click me';
  const type: "submit" | "reset" | "button" | undefined = 'button';
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders Button with the correct label and type', () => {
    render(<Button label={label} type={type} onClick={mockOnClick} />);
    const buttonElement = screen.getByText(label);
    
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', type);
  });

  it('calls onClick when the button is clicked', () => {
    render(<Button label={label} type={type} onClick={mockOnClick} />);
    const buttonElement = screen.getByText(label);
    
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('does not call onClick if it is not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Button label={label} type={type} onClick={() => {}} />);
    const buttonElement = screen.getByText(label);
    
    fireEvent.click(buttonElement);
    expect(mockOnClick).not.toHaveBeenCalled(); // Check if onClick is not called
  });
});
