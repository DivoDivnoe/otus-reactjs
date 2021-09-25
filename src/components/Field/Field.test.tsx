import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Field, { FieldProps } from './Field';
import { Model } from '../App/App';
import { BoardSize } from '@/constants';

const model: Model = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

describe('Field', () => {
  it('handles click event correctly', () => {
    const mocks: FieldProps = {
      size: 'small' as BoardSize,
      model,
      clickHandler: jest.fn(),
    };

    render(<Field {...mocks} />);

    fireEvent.click(screen.getAllByTestId('cell')[7]);
    expect(mocks.clickHandler).toHaveBeenCalledWith({ x: 2, y: 1 });
  });
});
