import { call, fork, select } from 'redux-saga/effects';

import { State } from '@/reducer';
import { BoardSize, getSize } from '@/reducer/game/size';
import { SpeedType } from '@/reducer/game/speed';
import { FillType, getFill } from '@/reducer/game/fill';
import { createRandomMatrix } from '@/core';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  createModel,
  saveStateToLocalStorage,
  getStateFromLocalStorage,
  actionsWatcher,
  stateSaga,
} from './saga';
import { APP_KEY } from '@/reducer/constants';

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
      const generator = saveStateToLocalStorage();

      expect(generator.next().value).toEqual(select());

      const defaultState: State = {
        game: {
          size: BoardSize.SMALL,
          speed: SpeedType.SLOW,
          fill: FillType.HIGH,
          isPlaying: false,
          model: [[]],
        },
        user: {
          userData: null,
        },
      };

      expect(generator.next(defaultState).value).toEqual(
        call(saveToLocalStorage, APP_KEY, JSON.stringify(defaultState))
      );
      expect(generator.next().done).toBe(true);
    });

    it('getStateFromLocalStorage fail', () => {
      const generator = getStateFromLocalStorage();

      expect(generator.next().value).toEqual(
        call(getFromLocalStorage, APP_KEY)
      );
      expect(generator.next(null).value).toEqual(fork(createModel));

      expect(generator.next().done).toBe(true);
    });

    it('getStateFromLocalStorage success', () => {
      const generator = getStateFromLocalStorage();
      const defaultState: State = {
        game: {
          size: BoardSize.SMALL,
          speed: SpeedType.SLOW,
          fill: FillType.HIGH,
          isPlaying: false,
          model: [[]],
        },
        user: {
          userData: null,
        },
      };

      expect(generator.next().value).toEqual(
        call(getFromLocalStorage, APP_KEY)
      );
      expect(generator.next(JSON.stringify(defaultState)).value)
        .toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": null,
              "type": "user/setUser",
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
      "user/setUser",
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
      "user/resetUser",
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
      const generator = stateSaga();

      expect(generator.next().value).toEqual(fork(getStateFromLocalStorage));
      expect(generator.next().value).toEqual(fork(actionsWatcher));
      expect(generator.next().done).toBe(true);
    });
  });
});
