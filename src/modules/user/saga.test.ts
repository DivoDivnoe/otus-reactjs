import { expectSaga, testSaga } from 'redux-saga-test-plan';
import reducer, { UserState, ActionCreator } from './user';
import {
  saveUserStateToLocalStorage,
  getUserStateFromLocalStorage,
  actionsWatcher,
  userStateSaga,
} from './saga';
import { NAME_SPACE as USER_KEY } from './nameSpace';
import { getUserState } from '@/reducer/selectors';
import { getFromLocalStorage, saveToLocalStorage } from '@/modules/game/utils';

describe('userStateSaga', () => {
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
      .silentRun();
  });
});
