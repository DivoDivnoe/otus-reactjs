import { call, fork, select } from 'redux-saga/effects';
import { UserState } from './user';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  saveUserStateToLocalStorage,
  getUserStateFromLocalStorage,
  actionsWatcher,
  userStateSaga,
} from './saga';
import { NAME_SPACE as USER_KEY } from './nameSpace';
import { getUserState } from '@/reducer/selectors';

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
    it('saveStateToLocalStorage', () => {
      const generator = saveUserStateToLocalStorage();

      expect(generator.next().value).toEqual(select(getUserState));

      const defaultState: UserState = {
        userData: null,
      };

      expect(generator.next(defaultState).value).toEqual(
        call(saveToLocalStorage, USER_KEY, JSON.stringify(defaultState))
      );
      expect(generator.next().done).toBe(true);
    });

    it('getStateFromLocalStorage', () => {
      const generator = getUserStateFromLocalStorage();
      const defaultState: UserState = {
        userData: null,
      };

      expect(generator.next().value).toEqual(
        call(getFromLocalStorage, USER_KEY)
      );
      expect(generator.next(JSON.stringify(defaultState)).value)
        .toMatchInlineSnapshot(`
        Object {
          "@@redux-saga/IO": true,
          "combinator": false,
          "payload": Object {
            "action": Object {
              "payload": null,
              "type": "user/signin",
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
              "user/signin",
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
              "user/signout",
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
      const generator = userStateSaga();

      expect(generator.next().value).toEqual(
        fork(getUserStateFromLocalStorage)
      );
      expect(generator.next().value).toEqual(fork(actionsWatcher));
      expect(generator.next().done).toBe(true);
    });
  });
});
