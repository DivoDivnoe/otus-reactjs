import {
  call,
  put,
  takeEvery,
  fork,
  select,
  StrictEffect,
  take,
} from 'redux-saga/effects';
import history from '@/history';
import { ActionCreator as UserActionCreator, UserState } from './user';
import { NAME_SPACE as USER_KEY } from './nameSpace';
import { getUserState } from '@/reducer/selectors';
import { getFromLocalStorage, saveToLocalStorage } from '@/modules/game/utils';

export function* getUserStateFromLocalStorage(): Generator<
  StrictEffect,
  void,
  string | null | UserState
> {
  const rawUserState = yield call(getFromLocalStorage, USER_KEY);
  let userState: UserState;

  if (rawUserState) {
    userState = JSON.parse(rawUserState as string);

    if (userState.userData) {
      yield put(UserActionCreator.signin(userState.userData));
    }
  }
}

export function* saveUserStateToLocalStorage(): Generator<
  StrictEffect,
  void,
  UserState
> {
  const userState: UserState = yield select(getUserState);
  const serializedState = JSON.stringify(userState);

  yield call(saveToLocalStorage, USER_KEY, serializedState);
}

export function* actionsWatcher(): Generator<StrictEffect, void, void> {
  const actions = [
    UserActionCreator.signin.type,
    UserActionCreator.signout.type,
  ];

  for (const action of actions) {
    yield takeEvery(action, saveUserStateToLocalStorage);
  }
}

export function* userAuth(): Generator<StrictEffect, void, string> {
  while (yield take(UserActionCreator.signin.type)) {
    yield call([history, history.push], '/');

    yield take(UserActionCreator.signout.type);
    yield call([history, history.push], '/login');
  }
}

export function* userStateSaga(): Generator<StrictEffect, void, void> {
  yield fork(userAuth);
  yield fork(getUserStateFromLocalStorage);
  yield fork(actionsWatcher);
}
