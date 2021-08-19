import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cell, { CellProps } from './Cell';

let mocks: CellProps;

describe('Cell', () => {
  it('renders active Cell component', () => {
    mocks = {
      coords: { x: 0, y: 0 },
      isActive: true,
      clickHandler: jest.fn(),
    };
    render(<Cell {...mocks} />);

    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('renders inactive Cell component', () => {
    mocks = {
      coords: { x: 0, y: 0 },
      isActive: false,
      clickHandler: jest.fn(),
    };
    render(<Cell {...mocks} />);

    expect(screen.queryByText('0.0')).toBeNull();
  });

  it('handles click event correctly', () => {
    mocks = {
      coords: { x: 0, y: 0 },
      isActive: true,
      clickHandler: jest.fn(),
    };
    render(<Cell {...mocks} />);

    fireEvent.click(screen.getByText('0.0'));
    expect(mocks.clickHandler).toHaveBeenCalledWith(mocks.coords);
  });
});
