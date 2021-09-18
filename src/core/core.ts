import { Model } from '@/components/App/App';
import { getMatrixItemNeighbours } from '@/utils/utils';
import { CellState } from '@/constants';

export const GameCoreLogicConfig = {
  NEIGHBOURS_AMOUNT_TO_BORN_NEW_ITEM: 3,
  MIN_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE: 2,
  MAX_NEIGHBOURS_AMOUNT_TO_STAY_ALIVE: 3,
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
        ).filter((item) => item == CellState.ALIVE).length;

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
