import React, { FC } from 'react';
import _ from 'underscore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withGameLogicHOC, {
  WithGameProps,
  getRandomMatrix,
  createRandomMatrix,
  getNewSizeMatrix,
  createNewSizeMatrix,
  createZeroMatrix,
  Model,
} from './withGameLogicHOC';
import { CellState, BoardSize, FillType } from '@/constants';

describe('getRandomMatrix', () => {
  describe('create matrix of right sizes', () => {
    it('width: 33, height: 22', () => {
      const arr = getRandomMatrix({ width: 33, height: 22 }, 0.1);

      expect(arr).toHaveLength(22);
      arr.forEach((row) => expect(row).toHaveLength(33));
    });

    it('width: -4, height: 0', () => {
      const arr = getRandomMatrix({ width: -4, height: 0 }, 0.1);

      expect(arr).toHaveLength(0);
    });
  });

  describe('create matrix with right fill percentage', () => {
    it('width: 10, height: 10, fill: 10', () => {
      const arr = getRandomMatrix({ width: 10, height: 10 }, 0.1);

      const aliveCellsAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.ALIVE
      );

      expect(aliveCellsAmount).toHaveLength(10);
    });

    it('width: 10, height: 10, fill: 0', () => {
      const arr = getRandomMatrix({ width: 10, height: 10 }, 0);

      const aliveCellsAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.ALIVE
      );

      expect(aliveCellsAmount).toHaveLength(0);
    });
  });
});

describe('createRandomMatrix', () => {
  describe('create matrix of right sizes', () => {
    it('size type SMALL', () => {
      const arr = createRandomMatrix(BoardSize.SMALL, FillType.LOW);

      expect(arr).toHaveLength(30);
      arr.forEach((row) => expect(row).toHaveLength(50));
    });

    it('size type MEDIUM', () => {
      const arr = createRandomMatrix(BoardSize.MEDIUM, FillType.LOW);

      expect(arr).toHaveLength(50);
      arr.forEach((row) => expect(row).toHaveLength(70));
    });

    it('size type LARGE', () => {
      const arr = createRandomMatrix(BoardSize.LARGE, FillType.LOW);

      expect(arr).toHaveLength(80);
      arr.forEach((row) => expect(row).toHaveLength(100));
    });
  });

  describe('create matrix with right fill percentage', () => {
    it('size type MEDIUM fill type LOW', () => {
      const arr = createRandomMatrix(BoardSize.MEDIUM, FillType.LOW);

      const aliveCellsAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.ALIVE
      );

      expect(aliveCellsAmount).toHaveLength(350);
    });

    it('size type LARGE fill type MEDIUM', () => {
      const arr = createRandomMatrix(BoardSize.LARGE, FillType.MEDIUM);

      const aliveCellsAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.ALIVE
      );

      expect(aliveCellsAmount).toHaveLength(1600);
    });

    it('size type SMALL fill type HIGH', () => {
      const arr = createRandomMatrix(BoardSize.SMALL, FillType.HIGH);

      const aliveCellsAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.ALIVE
      );

      expect(aliveCellsAmount).toHaveLength(450);
    });
  });
});

describe('getNewSizeMatrix', () => {
  describe('create matrix of right sizes', () => {
    it('returns prev matrix, if size doesnt change', () => {
      const prevMatrix = [
        [0, 1],
        [1, 0],
      ];
      const arr = getNewSizeMatrix(
        { width: 2, height: 2 },
        prevMatrix as Model
      );

      expect(arr).toBe(prevMatrix);
    });

    it('prev 2x2, next 3x3', () => {
      const prevMatrix = [
        [0, 1],
        [1, 1],
      ];
      const arr = getNewSizeMatrix(
        { width: 3, height: 3 },
        prevMatrix as Model
      );

      expect(arr).toEqual([
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]);
    });

    it('prev 3x2, next 2x3', () => {
      const prevMatrix = [
        [1, 1, 1],
        [1, 1, 1],
      ];
      const arr = getNewSizeMatrix(
        { width: 2, height: 3 },
        prevMatrix as Model
      );

      expect(arr).toEqual([
        [1, 1],
        [1, 1],
        [0, 0],
      ]);
    });
  });
});

describe('createNewSizeMatrix', () => {
  describe('create matrix of right sizes', () => {
    it('size type SMALL', () => {
      const prevMatrix: Model = [
        [0, 1],
        [1, 0],
      ];
      const arr = createNewSizeMatrix(BoardSize.SMALL, prevMatrix);

      expect(arr).toHaveLength(30);
      arr.forEach((row) => expect(row).toHaveLength(50));
    });

    it('size type MEDIUM', () => {
      const prevMatrix: Model = [
        [0, 1],
        [1, 0],
      ];
      const arr = createNewSizeMatrix(BoardSize.MEDIUM, prevMatrix);

      expect(arr).toHaveLength(50);
      arr.forEach((row) => expect(row).toHaveLength(70));
    });

    it('size type LARGE', () => {
      const prevMatrix: Model = [
        [0, 1],
        [1, 0],
      ];
      const arr = createNewSizeMatrix(BoardSize.LARGE, prevMatrix);

      expect(arr).toHaveLength(80);
      arr.forEach((row) => expect(row).toHaveLength(100));
    });
  });
});

describe('createZeroMatrix', () => {
  describe('create matrix of right sizes', () => {
    it('size SMALL', () => {
      const arr = createZeroMatrix(BoardSize.SMALL);

      expect(arr).toHaveLength(30);
      arr.forEach((row) => expect(row).toHaveLength(50));
    });

    it('size MEDIUM', () => {
      const arr = createZeroMatrix(BoardSize.MEDIUM);

      expect(arr).toHaveLength(50);
      arr.forEach((row) => expect(row).toHaveLength(70));
    });

    it('size LARGE', () => {
      const arr = createZeroMatrix(BoardSize.LARGE);

      expect(arr).toHaveLength(80);
      arr.forEach((row) => expect(row).toHaveLength(100));
    });
  });

  describe('create matrix filled with zeroes', () => {
    it('size LARGE', () => {
      const arr = createZeroMatrix(BoardSize.LARGE);

      const zeroesAmount = _.flatten(arr).filter(
        (cell) => cell === CellState.DEAD
      );

      expect(zeroesAmount).toHaveLength(8000);
    });
  });
});

describe('withGameLogicHOC', () => {
  it('renders component correctly', () => {
    const MockComponent: FC<WithGameProps> = (props) => {
      return <div data-testid='mockComponent' {...props} />;
    };
    const MockComponentWithGameLogic = withGameLogicHOC(MockComponent);

    render(<MockComponentWithGameLogic />);
    expect(screen.getByTestId('mockComponent')).toBeInTheDocument();
  });
});
