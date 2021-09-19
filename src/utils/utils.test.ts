import {
  getRandomValuesArr,
  getMatrixItemNeighbours,
  getZeroMatrix,
} from './utils';

describe('getRandomValuesArr function', () => {
  describe('returns array of correctLength', () => {
    it('length 10', () => {
      expect(getRandomValuesArr(100, 10).length).toBe(10);
    });

    it('length 0', () => {
      expect(getRandomValuesArr(100, 0).length).toBe(0);
    });

    it('length -5', () => {
      expect(getRandomValuesArr(100, -5).length).toBe(0);
    });
  });

  describe('returns array of numbers less then maxValue', () => {
    it('maxValue 10', () => {
      const arr = getRandomValuesArr(10, 10);

      arr.forEach((item) => {
        expect(item < 10).toEqual(true);
      });
    });
  });

  describe('throws error, if impossible to build arr', () => {
    it('maxValue 10, length 20', () => {
      expect(() => getRandomValuesArr(10, 20)).toThrowError(
        'items amount cannot be more then max value'
      );
    });
  });
});

describe('getMatrixItemNeighbours function', () => {
  describe('returns correct values, if item is not of edge type', () => {
    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 1, col: 1', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 1, 1).sort()).toEqual([
        1, 2, 3, 4, 6, 7, 8, 9,
      ]);
    });

    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 0, col: 0', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 0, 0).sort()).toEqual([2, 4, 5]);
    });

    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 1, col: 0', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 1, 0).sort()).toEqual([
        1, 2, 5, 7, 8,
      ]);
    });

    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 0, col: 1', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 0, 1).sort()).toEqual([
        1, 3, 4, 5, 6,
      ]);
    });

    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 1, col: 2', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 1, 2).sort()).toEqual([
        2, 3, 5, 8, 9,
      ]);
    });

    it('arr [[1, 2, 3], [4, 5, 6], [7, 8, 9]], row: 2, col: 1', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(getMatrixItemNeighbours(arr, 2, 1).sort()).toEqual([
        4, 5, 6, 7, 9,
      ]);
    });
  });
});

describe('getZeroMatrix function', () => {
  it('works correctly', () => {
    expect(getZeroMatrix({ width: 3, height: 2 })).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
});
