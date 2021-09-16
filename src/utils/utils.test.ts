import { getRandomValuesArr } from './utils';

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
