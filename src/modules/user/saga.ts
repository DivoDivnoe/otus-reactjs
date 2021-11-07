import {
  call,
  put,
  takeEvery,
  fork,
  select,
  StrictEffect,
} from 'redux-saga/effects';
import { ActionCreator as UserActionCreator } from '@/modules/user';
import { UserState } from './user';
import { NAME_SPACE as USER_KEY } from './nameSpace';
import { getUserState } from '@/reducer';

export const getFromLocalStorage = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

export const saveToLocalStorage = (key: string, state: string): void => {
  window.localStorage.setItem(key, state);
};

export function* getUserStateFromLocalStorage(): Generator<
  StrictEffect,
  void,
  string | null | UserState
> {
  const rawUserState = yield call(getFromLocalStorage, USER_KEY);
  let userState: UserState;

  if (rawUserState) {
    userState = JSON.parse(rawUserState as string);

    yield put(UserActionCreator.signin(userState.userData));
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

export function* userStateSaga(): Generator<StrictEffect, void, void> {
  yield fork(getUserStateFromLocalStorage);
  yield fork(actionsWatcher);
}
