import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders Button component with correct text', () => {
    const mocks = {
      isActive: false,
      clickHandler: jest.fn(),
    };
    const text = 'Run';
    render(<Button {...mocks}>{text}</Button>);

    expect(screen.getByText('Run')).toBeInTheDocument();
  });

  it('handles click event correctly', () => {
    const mocks = {
      isActive: false,
      clickHandler: jest.fn(),
    };
    const text = 'Run';
    render(<Button {...mocks}>{text}</Button>);

    fireEvent.click(screen.getByText('Run'));
    expect(mocks.clickHandler).toHaveBeenCalledTimes(1);
  });
});
