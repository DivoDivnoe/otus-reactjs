import { call, fork, select } from 'redux-saga/effects';
import { BoardSize, getSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType, getFill } from '@/modules/game/fill';
import { createRandomMatrix } from '@/modules/game/core';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  createModel,
  saveGameStateToLocalStorage,
  getGameStateFromLocalStorage,
  actionsWatcher,
  gameStateSaga,
} from './saga';
import { GameState, NAME_SPACE as GAME_KEY } from './';

describe('helper', () => {
  describe('saveToLocalStorage', () => {
    it('works correctly', () => {
      const key = 'some_key';
      const someObj = { some: 'obj' };

      saveToLocalStorage(key, JSON.stringify(someObj));

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(someObj));
    });
  });

  describe('getFromLocalStorage', () => {
    it('works correctly', () => {
      const key = 'some_key';
      const someObj = { some: 'obj' };

      localStorage.setItem(key, JSON.stringify(someObj));
      const objFromStorage = getFromLocalStorage(key);

      expect(objFromStorage).toEqual(JSON.stringify(someObj));
    });
  });

  describe('stateSaga', () => {
    it('createModel', () => {
      const generator = createModel();

      expect(generator.next().value).toEqual(select(getSize));
      expect(generator.next(BoardSize.SMALL).value).toEqual(select(getFill));

      expect(generator.next(FillType.HIGH).value).toEqual(
        call(createRandomMatrix, BoardSize.SMALL, FillType.HIGH)
      );

      expect(
        generator.next([
          [0, 0],
          [1, 1],
        ]).value
      ).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": Array [
                Array [
                  0,
                  0,
                ],
                Array [
                  1,
                  1,
                ],
              ],
              "type": "model/setModel",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);

      expect(generator.next().done).toBe(true);
    });

    it('saveStateToLocalStorage', () => {
      const generator = saveGameStateToLocalStorage();

      expect(generator.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "combinator": false,
  "payload": Object {
    "args": Array [],
    "selector": [Function],
  },
  "type": "SELECT",
}
`);

      const defaultState: GameState = {
        size: BoardSize.SMALL,
        speed: SpeedType.SLOW,
        fill: FillType.HIGH,
        isPlaying: false,
        model: [[]],
      };

      expect(generator.next(defaultState).value).toEqual(
        call(saveToLocalStorage, GAME_KEY, JSON.stringify(defaultState))
      );
      expect(generator.next().done).toBe(true);
    });

    it('getStateFromLocalStorage fail', () => {
      const generator = getGameStateFromLocalStorage();

      expect(generator.next().value).toEqual(
        call(getFromLocalStorage, GAME_KEY)
      );
      expect(generator.next(null).value).toEqual(fork(createModel));

      expect(generator.next().done).toBe(true);
    });

    it('getStateFromLocalStorage success', () => {
      const generator = getGameStateFromLocalStorage();
      const defaultState: GameState = {
        size: BoardSize.SMALL,
        speed: SpeedType.SLOW,
        fill: FillType.HIGH,
        isPlaying: false,
        model: [[]],
      };

      expect(generator.next().value).toEqual(
        call(getFromLocalStorage, GAME_KEY)
      );
      expect(generator.next(JSON.stringify(defaultState)).value)
        .toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": "small",
              "type": "size/setSize",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);

      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": "slow",
              "type": "speed/setSpeed",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": "high",
              "type": "fill/setFill",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": false,
              "type": "isPlaying/setPlaying",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": Array [
                Array [],
              ],
              "type": "model/setModel",
            },
            "channel": undefined,
          },
          "type": "PUT",
        }
      `);

      expect(generator.next().done).toBe(true);
    });

    it('actionsWatcher', () => {
      const generator = actionsWatcher();

      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "size/setSize",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "speed/setSpeed",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "fill/setFill",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "model/setModel",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "model/resetModel",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "isPlaying/setPlaying",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "isPlaying/startPlaying",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "isPlaying/stopPlaying",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "size/setSize",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);
      expect(generator.next().value).toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "args": Array [
              "fill/setFill",
              [Function],
            ],
            "context": null,
            "fn": [Function],
          },
          "type": "FORK",
        }
      `);

      expect(generator.next().done).toBe(true);
    });

    it('works correctly', () => {
      const generator = gameStateSaga();

      expect(generator.next().value).toEqual(
        fork(getGameStateFromLocalStorage)
      );
      expect(generator.next().value).toEqual(fork(actionsWatcher));
      expect(generator.next().done).toBe(true);
    });
  });
});
