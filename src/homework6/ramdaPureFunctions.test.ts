import {
  getMaxScoreTeam,
  getName,
  getTopName,
  Pairs,
  Pair,
  joinPair,
  getQsItemsArr,
  getQs,
  Team,
  QsObj,
  createQs,
  sliceQs,
  getSplitedQs,
  getObj,
  parseQs,
} from './ramdaPureFunctions';

test('getMaxScoreTeam', () => {
  const teams: Team[] = [
    { name: 'Lions', score: 5 },
    { name: 'Tigers', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'Monkeys', score: 2 },
  ];

  expect(getMaxScoreTeam(teams)).toEqual({ name: 'Bears', score: 6 });
});

test('getName', () => {
  const team: Team = { name: 'Lions', score: 5 };

  expect(getName(team)).toBe('Lions');
});

test('getTopName', () => {
  const teams: Team[] = [
    { name: 'Lions', score: 5 },
    { name: 'Tigers', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'Monkeys', score: 2 },
  ];

  expect(getTopName(teams)).toBe('Bears');
});

test('joinPair', () => {
  const pair: Pair = ['key', 'value'];

  expect(joinPair(pair)).toBe('key=value');
});

test('getQsItemsArr', () => {
  const pairs: Pairs = [
    ['key1', 'value1'],
    ['key2', 'value2'],
  ];

  expect(getQsItemsArr(pairs)).toEqual(['key1=value1', 'key2=value2']);
});

test('getQs', () => {
  const strs: string[] = ['key1=value1', 'key2=value2'];

  expect(getQs(strs)).toBe('?key1=value1&key2=value2');
});

test('createQs', () => {
  const qsObj: QsObj = {
    page: '2',
    pageSize: '10',
    total: '205',
    somethingElse: 'value',
  };

  expect(createQs(qsObj)).toBe(
    '?page=2&pageSize=10&total=205&somethingElse=value'
  );
});

test('sliceQs', () => {
  const str = '?someKey=someValue';

  expect(sliceQs(str)).toBe('someKey=someValue');
});

test('getSplitedQs', () => {
  const str = 'someKey=someValue&key=value&name=andrey';

  expect(getSplitedQs(str)).toEqual([
    'someKey=someValue',
    'key=value',
    'name=andrey',
  ]);
});

test('getObj', () => {
  const strs = ['someKey=someValue', 'key=value', 'name=andrey'];

  expect(getObj(strs)).toEqual({
    someKey: 'someValue',
    key: 'value',
    name: 'andrey',
  });
});

test('parseQs', () => {
  const qs = '?page=2&pageSize=10&total=205&somethingElse=value';

  expect(parseQs(qs)).toEqual({
    page: '2',
    pageSize: '10',
    total: '205',
    somethingElse: 'value',
  });
});
