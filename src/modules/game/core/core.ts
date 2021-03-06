import {
  getRandomValuesArr,
  getZeroMatrix,
  getMatrixItemNeighbours,
} from '@/modules/game/utils';
import { BoardSize, SizeProps, BoardSizeValue } from '@/modules/game/size';
import { FillType, BoardFillPercentage } from '@/modules/game/fill';
import { Model, CellState } from '@/modules/game/model';

export const GameCoreLogicConfig = {
  NEIGHBOURS_AMOUNT_TO_BORN_NEW_ITEM: 3,
  MIN_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE: 2,
  MAX_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE: 3,
};

export const getRandomMatrix = (size: SizeProps, fill: number): Model => {
  const { width, height } = size;
  const maxValue = width * height;
  const amount = Math.round(fill * maxValue);
  const randomIndexes = getRandomValuesArr(maxValue, amount);

  return Array.from({ length: height }, (_, rowIndex) => {
    return Array.from({ length: width }, (_, columnIndex) => {
      return randomIndexes.includes(rowIndex * width + columnIndex)
        ? CellState.ALIVE
        : CellState.DEAD;
    });
  });
};

export const createRandomMatrix = (
  sizeType: BoardSize,
  fillType: FillType
): Model => {
  const size = BoardSizeValue[sizeType];
  const fill = BoardFillPercentage[fillType];

  return getRandomMatrix(size, fill);
};

export const createZeroMatrix = (sizeType: BoardSize): Model => {
  const size = BoardSizeValue[sizeType];

  return getZeroMatrix(size) as Model;
};

export const getNextGenMatrix = (prevGenMatrix: Model): Model => {
  const {
    MIN_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE,
    MAX_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE,
    NEIGHBOURS_AMOUNT_TO_BORN_NEW_ITEM,
  } = GameCoreLogicConfig;

  return Array.from({ length: prevGenMatrix.length }, (_, rowIndex) => {
    return Array.from(
      { length: prevGenMatrix[rowIndex].length },
      (_, columnIndex) => {
        const currentItem = prevGenMatrix[rowIndex][columnIndex];
        const aliveNeighboursLength = getMatrixItemNeighbours(
          prevGenMatrix,
          rowIndex,
          columnIndex
        ).filter((item) => item === CellState.ALIVE).length;

        if (
          currentItem === CellState.DEAD &&
          aliveNeighboursLength === NEIGHBOURS_AMOUNT_TO_BORN_NEW_ITEM
        ) {
          return CellState.ALIVE;
        }

        if (
          currentItem === CellState.ALIVE &&
          (aliveNeighboursLength < MIN_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE ||
            aliveNeighboursLength > MAX_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE)
        ) {
          return CellState.DEAD;
        }

        return currentItem;
      }
    );
  });
};
