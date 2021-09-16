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
