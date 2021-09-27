import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cell, CellProps } from './Cell';

describe('Cell', () => {
  it('renders correctly', () => {
    const mocks: CellProps = {
      coords: { x: 0, y: 0 },
      isActive: true,
      clickHandler: jest.fn(),
    };

    const { asFragment } = render(<Cell {...mocks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles click event correctly', () => {
    const mocks: CellProps = {
      coords: { x: 0, y: 0 },
      isActive: true,
      clickHandler: jest.fn(),
    };
    render(<Cell {...mocks} />);

    fireEvent.click(screen.getAllByTestId('cell')[0]);
    expect(mocks.clickHandler).toHaveBeenCalledWith(mocks.coords);
  });
});
