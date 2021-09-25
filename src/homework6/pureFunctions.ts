// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  const maxScoreTeam = teams.reduce((acc, team) => {
    if (team.score > acc.score) return team;

    return acc;
  });

  return maxScoreTeam.name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean>;

export const createQs = (qsObj: QsObj): string => {
  const items = Object.entries(qsObj).map(([key, value]) => `${key}=${value}`);

  return `?${items.join('&')}`;
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
  return qs
    .slice(1)
    .split('&')
    .reduce((acc, item) => {
      const [key, value] = item.split('=');

      acc[key] = value;

      return acc;
    }, {} as QsObj);
};
