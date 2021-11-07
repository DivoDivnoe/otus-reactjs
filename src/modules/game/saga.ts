import {
  call,
  put,
  takeEvery,
  fork,
  select,
  StrictEffect,
} from 'redux-saga/effects';
import {
  ActionCreator as ModelActionCreator,
  Model,
} from '@/modules/game/model';
import {
  ActionCreator as SizeActionCreator,
  getSize,
  BoardSize,
} from '@/modules/game/size';
import { ActionCreator as SpeedActionCreator } from '@/modules/game/speed';

import {
  ActionCreator as FillActionCreator,
  getFill,
  FillType,
} from '@/modules/game/fill';

import { ActionCreator as IsPlayingActionCreator } from '@/modules/game/isPlaying';
import { createRandomMatrix } from '@/modules/game/core';
import { GameState, NAME_SPACE as GAME_KEY } from './';
import { State } from '@/reducer';
import { getGameState } from '@/reducer/selectors';

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

export function* getGameStateFromLocalStorage(): Generator<
  StrictEffect,
  void,
  string | null | GameState
> {
  const rawState = yield call(getFromLocalStorage, GAME_KEY);
  let state: GameState;

  if (rawState) {
    state = JSON.parse(rawState as string);

    yield put(SizeActionCreator.setSize(state.size));
    yield put(SpeedActionCreator.setSpeed(state.speed));
    yield put(FillActionCreator.setFill(state.fill));
    yield put(IsPlayingActionCreator.setPlaying(state.isPlaying));
    yield put(ModelActionCreator.setModel(state.model));
  } else {
    yield fork(createModel);
  }
}

export function* saveGameStateToLocalStorage(): Generator<
  StrictEffect,
  void,
  GameState
> {
  const state: GameState = yield select(getGameState);
  const serializedState = JSON.stringify(state);

  yield call(saveToLocalStorage, GAME_KEY, serializedState);
}

export function* actionsWatcher(): Generator<StrictEffect, void, void> {
  const actions = [
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
    yield takeEvery(action, saveGameStateToLocalStorage);
  }

  yield takeEvery(SizeActionCreator.setSize.type, createModel);
  yield takeEvery(FillActionCreator.setFill.type, createModel);
}

export function* gameStateSaga(): Generator<StrictEffect, void, void> {
  yield fork(getGameStateFromLocalStorage);
  yield fork(actionsWatcher);
}
