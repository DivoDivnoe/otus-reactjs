import { call, fork, select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import reducer, { UserState, ActionCreator } from './user';
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

describe('userStateSaga', () => {
  describe('helpers', () => {
    it('saveToLocalStorage', () => {
      const key = 'some_key';
      const someObj = { some: 'obj' };

      saveToLocalStorage(key, JSON.stringify(someObj));

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(someObj));
    });

    it('getFromLocalStorage', () => {
      const key = 'some_key';
      const someObj = { some: 'obj' };

      localStorage.setItem(key, JSON.stringify(someObj));
      const objFromStorage = getFromLocalStorage(key);

      expect(objFromStorage).toEqual(JSON.stringify(someObj));
    });
  });

  it('saveUserStateToLocalStorage', () => {
    const defaultState: UserState = {
      userData: null,
    };

    testSaga(saveUserStateToLocalStorage)
      .next()
      .select(getUserState)
      .next(defaultState)
      .call(saveToLocalStorage, USER_KEY, JSON.stringify(defaultState))
      .next()
      .isDone();
  });

  describe('getUserStateFromLocalStorage', () => {
    it('localstorage is not empty', () => {
      const defaultState: UserState = {
        userData: 'Andrey',
      };

      saveToLocalStorage(USER_KEY, JSON.stringify(defaultState));

      return expectSaga(getUserStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, USER_KEY)
        .put(ActionCreator.signin('Andrey'))
        .hasFinalState(defaultState)
        .run();
    });

    it('localstorage is empty', () => {
      const defaultState: UserState = {
        userData: null,
      };

      window.localStorage.removeItem(USER_KEY);

      return expectSaga(getUserStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, USER_KEY)
        .hasFinalState(defaultState)
        .run();
    });
  });

  it('actionsWatcher', () => {
    return expectSaga(actionsWatcher)
      .withReducer(reducer)
      .dispatch({ type: 'user/signin', payload: 'Andrew' })
      .hasFinalState({ userData: 'Andrew' })
      .run();
  });

  describe('works correctly', () => {
    it('localstorage is not empty', () => {
      const defaultState = {
        userData: 'Ibrahim abasel abdy nursultan',
      };
      saveToLocalStorage(USER_KEY, JSON.stringify(defaultState));

      return expectSaga(userStateSaga)
        .withReducer(reducer)
        .dispatch({ type: 'user/signin', payload: 'Andrew' })
        .call(getFromLocalStorage, USER_KEY)
        .put(ActionCreator.signin('Ibrahim abasel abdy nursultan'))
        .hasFinalState({ userData: 'Ibrahim abasel abdy nursultan' })
        .run();
    });
  });
});
