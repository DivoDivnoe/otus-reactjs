import { getNextGenMatrix } from './core';
import { Model } from '@/core';

describe('getNextGenMatrix function returns next gen correctly', () => {
  describe('arr 2x2', () => {
    it('stable case', () => {
      const prevGenMatrix = [
        [1, 1],
        [1, 1],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [1, 1],
        [1, 1],
      ]);
    });

    it('full zero case', () => {
      const prevGenMatrix = [
        [0, 0],
        [0, 0],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });

    it('born new item case', () => {
      const prevGenMatrix = [
        [1, 1],
        [0, 1],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [1, 1],
        [1, 1],
      ]);
    });
  });

  describe('arr 3x3', () => {
    it('stable case 1', () => {
      const prevGenMatrix = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]);
    });

    it('stable case 2', () => {
      const prevGenMatrix = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ]);
    });

    it('unstable case 1', () => {
      const prevGenMatrix = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ]);
    });

    it('unstable case 2', () => {
      const prevGenMatrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]);
    });

    it('unstable case 3', () => {
      const prevGenMatrix = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];
      expect(getNextGenMatrix(prevGenMatrix as Model)).toEqual([
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ]);
    });
  });
});
