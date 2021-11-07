import { SizeProps } from '@/modules/game/size';

export const getRandomValuesArr = (
  maxValue: number,
  amount: number
): number[] => {
  if (maxValue < amount) {
    throw new Error('items amount cannot be more then max value');
  }

  const cache: number[] = [];

  const result = Array.from({ length: amount }, () => {
    let random;

    do {
      random = getRandomValue(maxValue);
    } while (cache[random]);

    cache[random] = 1;

    return random;
  });

  return result;
};

export const getRandomValue = (maxValue: number): number => {
  return Math.floor(Math.random() * maxValue);
};

export const getMatrixItemNeighbours = (
  matrix: number[][],
  rowIndex: number,
  columnIndex: number
): number[] => {
  const neighBours = [];

  if (columnIndex > 0) {
    neighBours.push(matrix[rowIndex][columnIndex - 1]);

    if (rowIndex > 0) {
      neighBours.push(matrix[rowIndex - 1][columnIndex - 1]);
    }

    if (rowIndex < matrix.length - 1) {
      neighBours.push(matrix[rowIndex + 1][columnIndex - 1]);
    }
  }

  if (columnIndex < matrix[rowIndex].length - 1) {
    neighBours.push(matrix[rowIndex][columnIndex + 1]);

    if (rowIndex > 0) {
      neighBours.push(matrix[rowIndex - 1][columnIndex + 1]);
    }

    if (rowIndex < matrix.length - 1) {
      neighBours.push(matrix[rowIndex + 1][columnIndex + 1]);
    }
  }

  if (rowIndex > 0) {
    neighBours.push(matrix[rowIndex - 1][columnIndex]);
  }

  if (rowIndex < matrix.length - 1) {
    neighBours.push(matrix[rowIndex + 1][columnIndex]);
  }

  return neighBours;
};

export const getZeroMatrix = (size: SizeProps): number[][] => {
  const { width, height } = size;

  return Array.from({ length: height }, () => {
    return Array.from({ length: width }, () => 0);
  });
};
