import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cell, CellProps, areEqual } from './Cell';
import { Coords } from '@/modules/game/model';

describe('Cell', () => {
  describe('areEqual helper works correctly', () => {
    it('with returning true value', () => {
      const clickHandler = (coords: Coords): void => {
        console.log(coords);
      };

      const props1: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler,
      };

      const props2: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler,
      };

      expect(areEqual(props1, props2)).toBe(true);
    });

    it('with different coords', () => {
      const clickHandler = (coords: Coords): void => {
        console.log(coords);
      };

      const props1: CellProps = {
        coords: { x: 1, y: 0 },
        isActive: true,
        clickHandler,
      };

      const props2: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler,
      };

      expect(areEqual(props1, props2)).toBe(false);
    });

    it('with different isActive value', () => {
      const clickHandler = (coords: Coords): void => {
        console.log(coords);
      };

      const props1: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: false,
        clickHandler,
      };

      const props2: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler,
      };

      expect(areEqual(props1, props2)).toBe(false);
    });

    it('with different clickHandlers', () => {
      const props1: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler: (coords: Coords): void => {
          console.log(coords);
        },
      };

      const props2: CellProps = {
        coords: { x: 0, y: 0 },
        isActive: true,
        clickHandler: (coords: Coords): void => {
          console.log(coords);
        },
      };

      expect(areEqual(props1, props2)).toBe(false);
    });
  });

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
