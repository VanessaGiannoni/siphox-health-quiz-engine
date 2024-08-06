import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput from './TextInput';

describe('TextInput component', () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnKeyDown.mockClear();
  });

  it('renders TextInput component correctly', () => {
    render(<TextInput onChange={mockOnChange} onKeyDown={mockOnKeyDown} />);
    expect(screen.getByLabelText('Type your answer')).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    render(<TextInput onChange={mockOnChange} onKeyDown={mockOnKeyDown} />);
    const inputElement = screen.getByLabelText('Type your answer');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'test' } });
    });
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)); // Check that the event is passed
  });

  it('calls onKeyDown when a key is pressed', () => {
    render(<TextInput onChange={mockOnChange} onKeyDown={mockOnKeyDown} />);
    const inputElement = screen.getByLabelText('Type your answer');

    act(() => {
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockOnKeyDown).toHaveBeenCalled();
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object)); // Check that the event is passed
  });
});
