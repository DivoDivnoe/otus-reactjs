import {
  call,
  put,
  takeEvery,
  fork,
  select,
  StrictEffect,
  take,
  cancel,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import {
  ActionCreator as ModelActionCreator,
  Model,
  getNextGenModel,
} from '@/modules/game/model';
import {
  ActionCreator as SizeActionCreator,
  getSize,
  BoardSize,
} from '@/modules/game/size';
import { getSpeed, SpeedType, SpeedValue } from '@/modules/game/speed';
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
import {
  delay,
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/modules/game/utils';

export function* stopPlaying(): Generator<StrictEffect, void, void> {
  yield put(IsPlayingActionCreator.stopPlaying());
}

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
    yield put(
      state.isPlaying
        ? IsPlayingActionCreator.startPlaying()
        : IsPlayingActionCreator.stopPlaying()
    );
    yield put(ModelActionCreator.setModel(state.model));
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
    ModelActionCreator.updateModel.type,
    IsPlayingActionCreator.startPlaying.type,
    IsPlayingActionCreator.stopPlaying.type,
  ];

  for (const action of actions) {
    yield takeEvery(action, saveGameStateToLocalStorage);
  }

  yield takeEvery(SizeActionCreator.setSize.type, createModel);
  yield takeEvery(FillActionCreator.setFill.type, createModel);

  yield takeEvery(SizeActionCreator.setSize.type, stopPlaying);
  yield takeEvery(FillActionCreator.setFill.type, stopPlaying);
}

export function* start(): Generator<StrictEffect, void, Model | SpeedType> {
  while (true) {
    const nextGeneration = yield select(getNextGenModel);
    const speed = yield select(getSpeed);
    const gameIterationDelay = SpeedValue[speed as SpeedType];

    yield put(ModelActionCreator.setModel(nextGeneration as Model));
    yield call(delay, gameIterationDelay);
  }
}

export function* play(): Generator<StrictEffect, void, Task> {
  while (yield take(IsPlayingActionCreator.startPlaying.type)) {
    const startGame = yield fork(start);

    yield take(IsPlayingActionCreator.stopPlaying.type);
    yield cancel(startGame);
  }
}

export function* gameStateSaga(): Generator<StrictEffect, void, void> {
  yield fork(createModel);
  yield fork(play);
  yield fork(getGameStateFromLocalStorage);
  yield fork(actionsWatcher);
}
