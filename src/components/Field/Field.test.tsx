import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Field, { FieldProps } from './Field';
import { Model } from '../App/App';

const model: Model = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

describe('Field', () => {
  it('renders Field component', () => {
    const mocks: FieldProps = {
      model,
      clickHandler: jest.fn(),
    };

    render(<Field {...mocks} />);

    expect(screen.getByText('1.2')).toBeInTheDocument();
    expect(screen.queryByText('0.0')).toBeNull();
  });

  it('handles click event correctly', () => {
    const mocks: FieldProps = {
      model,
      clickHandler: jest.fn(),
    };

    render(<Field {...mocks} />);

    fireEvent.click(screen.getByText('1.2'));
    expect(mocks.clickHandler).toHaveBeenCalledWith({ x: 2, y: 1 });
  });
});
