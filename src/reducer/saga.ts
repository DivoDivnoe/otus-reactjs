import {
  call,
  put,
  takeEvery,
  fork,
  select,
  StrictEffect,
} from 'redux-saga/effects';
import { APP_KEY } from './constants';
import { State } from '@/reducer';
import { ActionCreator as UserActionCreator, getUser } from '@/modules/user';
import {
  ActionCreator as ModelActionCreator,
  getModel,
  Model,
} from '@/modules/game/model';
import {
  ActionCreator as SizeActionCreator,
  getSize,
  BoardSize,
} from '@/modules/game/size';
import {
  ActionCreator as SpeedActionCreator,
  getSpeed,
} from '@/modules/game/speed';

import {
  ActionCreator as FillActionCreator,
  getFill,
  FillType,
} from '@/modules/game/fill';

import {
  ActionCreator as IsPlayingActionCreator,
  getIsPlaying,
} from '@/modules/game/isPlaying';
import { createRandomMatrix } from '@/modules/game/core';

export const getFromLocalStorage = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

export const saveToLocalStorage = (key: string, state: string): void => {
  window.localStorage.setItem(key, state);
};

export function* createModel(): Generator<
  StrictEffect,
  void,
  Model | State | BoardSize | FillType
> {
  const size = yield select(getSize);
  const fill = yield select(getFill);

  const model = yield call(
    createRandomMatrix,
    size as BoardSize,
    fill as FillType
  );
  yield put(ModelActionCreator.setModel(model as Model));
}

export function* getStateFromLocalStorage(): Generator<
  StrictEffect,
  void,
  string | null | State
> {
  const rawState = yield call(getFromLocalStorage, APP_KEY);
  let state: State;

  if (rawState) {
    state = JSON.parse(rawState as string);

    yield put(UserActionCreator.signin(getUser(state)));
    yield put(SizeActionCreator.setSize(getSize(state)));
    yield put(SpeedActionCreator.setSpeed(getSpeed(state)));
    yield put(FillActionCreator.setFill(getFill(state)));
    yield put(IsPlayingActionCreator.setPlaying(getIsPlaying(state)));
    yield put(ModelActionCreator.setModel(getModel(state)));
  } else {
    yield fork(createModel);
  }
}

export function* saveStateToLocalStorage(): Generator<
  StrictEffect,
  void,
  State
> {
  const state: State = yield select();
  const serializedState = JSON.stringify(state);

  yield call(saveToLocalStorage, APP_KEY, serializedState);
}

export function* actionsWatcher(): Generator<StrictEffect, void, void> {
  const actions = [
    UserActionCreator.signin.type,
    UserActionCreator.signout.type,
    SizeActionCreator.setSize.type,
    SpeedActionCreator.setSpeed.type,
    FillActionCreator.setFill.type,
    ModelActionCreator.setModel.type,
    ModelActionCreator.resetModel.type,
    IsPlayingActionCreator.setPlaying.type,
    IsPlayingActionCreator.startPlaying.type,
    IsPlayingActionCreator.stopPlaying.type,
  ];

  for (const action of actions) {
    yield takeEvery(action, saveStateToLocalStorage);
  }

  yield takeEvery(SizeActionCreator.setSize.type, createModel);
  yield takeEvery(FillActionCreator.setFill.type, createModel);
}

export function* stateSaga(): Generator<StrictEffect, void, void> {
  yield fork(getStateFromLocalStorage);
  yield fork(actionsWatcher);
}
