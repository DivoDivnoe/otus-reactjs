// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam1 = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  return Object.assign(
    {},
    { league: originalTeam.league, name: 'New York Badgers', roster: 25 }
  );
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  return (['two'] as SomeArray).concat(originalArray.slice(2), 5);
};

// Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
  const keys = Object.keys(originalTeam);

  return keys.reduce((acc, key) => {
    if (key === 'captain') {
      const obj = originalTeam.captain;

      acc['captain'] = Object.assign({}, obj, {
        age: obj.age + 1,
      });
    } else {
      acc[key as keyof Omit<Team, 'captain'>] =
        originalTeam[key as keyof Omit<Team, 'captain'>];
    }

    return acc;
  }, {} as Team);
};
