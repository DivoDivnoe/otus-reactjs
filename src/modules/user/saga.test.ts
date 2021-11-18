import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { UserState, ActionCreator } from './user';
import {
  saveUserStateToLocalStorage,
  getUserStateFromLocalStorage,
  actionsWatcher,
  userAuth,
  userStateSaga,
} from './saga';
import history from '@/history';
import { NAME_SPACE as USER_KEY } from './nameSpace';
import { getUserState } from '@/reducer/selectors';
import { getFromLocalStorage, saveToLocalStorage } from '@/modules/game/utils';
import reducer, { State } from '@/reducer';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';

import { FillType } from '@/modules/game/fill';

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
      const state: State = {
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.MEDIUM,
          fill: FillType.MEDIUM,
          isPlaying: false,
          model: [[]],
        },
        user: {
          userData: 'Andrey',
        },
      };

      saveToLocalStorage(
        USER_KEY,
        JSON.stringify({
          userData: 'Andrey',
        })
      );

      return expectSaga(getUserStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, USER_KEY)
        .put(ActionCreator.signin('Andrey'))
        .hasFinalState({ ...state, user: { userData: 'Andrey' } })
        .run();
    });

    it('localstorage is empty', () => {
      const state: State = {
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.MEDIUM,
          fill: FillType.MEDIUM,
          isPlaying: false,
          model: [[]],
        },
        user: {
          userData: null,
        },
      };

      window.localStorage.removeItem(USER_KEY);

      return expectSaga(getUserStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, USER_KEY)
        .hasFinalState(state)
        .run();
    });
  });

  it('actionsWatcher', () => {
    const state: State = {
      game: {
        size: BoardSize.MEDIUM,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
        isPlaying: false,
        model: [[]],
      },
      user: {
        userData: null,
      },
    };

    return expectSaga(actionsWatcher)
      .withReducer(reducer)
      .dispatch({ type: 'user/signin', payload: 'Andrew' })
      .hasFinalState({ ...state, user: { userData: 'Andrew' } })
      .silentRun();
  });

  it('userAuth', () => {
    testSaga(userAuth)
      .next()
      .take(ActionCreator.signin.type)
      .next({ type: 'user/signin', payload: 'Andrey' })
      .call([history, history.push], '/')
      .next()
      .take(ActionCreator.signout.type)
      .next({ type: 'user/signin' })
      .call([history, history.push], '/login')
      .next()
      .finish();
  });

  it('userStateSaga', () => {
    const state: State = {
      game: {
        size: BoardSize.MEDIUM,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
        isPlaying: false,
        model: [[]],
      },
      user: {
        userData: null,
      },
    };

    saveToLocalStorage(USER_KEY, JSON.stringify({ userData: 'Andrey' }));

    return expectSaga(userStateSaga)
      .withReducer(reducer)
      .fork(userAuth)
      .fork(getUserStateFromLocalStorage)
      .fork(actionsWatcher)
      .hasFinalState({ ...state, user: { userData: 'Andrey' } })
      .silentRun();
  });
});
