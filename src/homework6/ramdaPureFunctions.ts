import {
  compose,
  reduce,
  toPairs,
  map,
  slice,
  split,
  join,
  prop,
  nth,
  assoc,
  last,
} from 'ramda';

// Задание 1
export type Team = { name: string; score: number };
export const getMaxScoreTeam = (teams: Team[]): Team =>
  reduce(
    (acc, team) => (prop('score', team) > prop('score', acc) ? team : acc),
    nth(0, teams) as Team,
    slice(1, Infinity, teams)
  );

export const getName = (team: Team): string => prop('name', team);
export const getTopName = compose(getName, getMaxScoreTeam);

// Задание 2
export type QsObj = Record<string, string | number | boolean>;
export type Pair = [string, string];
export type Pairs = Pair[];

export const joinPair = (pair: Pair): string => join('=', pair);
export const getQsItemsArr = (pairs: Pairs): string[] => map(joinPair, pairs);
export const getQs = (items: string[]): string => `?${join('&', items)}`;

export const createQs = compose(getQs, getQsItemsArr, toPairs);

// Задание 3
export const sliceQs = (str: string): string => slice(1, Infinity, str);
export const getSplitedQs = (str: string): string[] => split('&', str);
export const getObj = (items: string[]): QsObj => {
  return reduce(
    (acc, item) => {
      const pair = split('=', item);

      return assoc(nth(0, pair) as string, last(pair), acc);
    },
    {} as QsObj,
    items
  );
};
export const parseQs = compose(getObj, getSplitedQs, sliceQs);
