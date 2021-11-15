import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { BoardSize, getSize, ActionCreator as SizeActionCreator } from './size';
import {
  SpeedType,
  ActionCreator as SpeedActionCreator,
  getSpeed,
  SpeedValue,
} from './speed';
import {
  ActionCreator as ModelActionCreator,
  Model,
  getNextGenModel,
} from './model';
import { FillType, getFill, ActionCreator as FillActionCreator } from './fill';
import { ActionCreator as IsPlayingActionCreator } from './isPlaying';
import { createRandomMatrix } from '@/modules/game/core';
import {
  createModel,
  saveGameStateToLocalStorage,
  getGameStateFromLocalStorage,
  actionsWatcher,
  start,
  play,
  gameStateSaga,
  stopPlaying,
} from './saga';
import { getGameState } from '@/reducer/selectors';
import { GameState, NAME_SPACE as GAME_KEY } from './';
import {
  delay,
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/modules/game/utils';

import reducer, { State } from '@/reducer';

describe('gameStateSaga', () => {
  it('createModel', () => {
    testSaga(createModel)
      .next()
      .select(getSize)
      .next(BoardSize.SMALL)
      .select(getFill)
      .next(FillType.HIGH)
      .call(createRandomMatrix, BoardSize.SMALL, FillType.HIGH)
      .next([
        [0, 0],
        [1, 1],
      ])
      .put(
        ModelActionCreator.setModel([
          [0, 0],
          [1, 1],
        ])
      )
      .next()
      .isDone();
  });

  it('start', () => {
    testSaga(start)
      .next()
      .select(getNextGenModel)
      .next([
        [0, 1, 1],
        [1, 0, 1],
        [0, 1, 0],
      ])
      .select(getSpeed)
      .next(SpeedType.FAST)
      .put(
        ModelActionCreator.setModel([
          [0, 1, 1],
          [1, 0, 1],
          [0, 1, 0],
        ])
      )
      .next()
      .call(delay, SpeedValue[SpeedType.FAST])
      .next()
      .select(getNextGenModel)
      .finish();
  });

  it('play', () => {
    const model = createRandomMatrix(BoardSize.MEDIUM, FillType.MEDIUM);

    const state: State = {
      game: {
        size: BoardSize.MEDIUM,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
        isPlaying: false,
        model,
      },
      user: {
        userData: null,
      },
    };

    return expectSaga(play)
      .withReducer(reducer)
      .provide([[select(getNextGenModel), model]])
      .dispatch({ type: 'isPlaying/startPlaying' })
      .put(ModelActionCreator.setModel(model))
      .call(delay, 150)
      .dispatch({ type: 'isPlaying/stopPlaying' })
      .hasFinalState(state)
      .silentRun();
  });

  it('saveGameStateToLocalStorage', () => {
    const defaultState: GameState = {
      size: BoardSize.SMALL,
      speed: SpeedType.SLOW,
      fill: FillType.HIGH,
      isPlaying: false,
      model: [[]],
    };

    testSaga(saveGameStateToLocalStorage)
      .next()
      .select(getGameState)
      .next(defaultState)
      .call(saveToLocalStorage, GAME_KEY, JSON.stringify(defaultState))
      .next()
      .isDone();
  });

  describe('getGameStateFromLocalStorage', () => {
    it('fail', () => {
      window.localStorage.removeItem(GAME_KEY);

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

      return expectSaga(getGameStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, GAME_KEY)
        .hasFinalState(state)
        .run();
    });

    it('success', () => {
      const defaultState: GameState = {
        size: BoardSize.SMALL,
        speed: SpeedType.SLOW,
        fill: FillType.HIGH,
        isPlaying: true,
        model: [
          [0, 1],
          [1, 0],
        ],
      };

      const fullState: State = {
        game: {
          size: BoardSize.SMALL,
          speed: SpeedType.SLOW,
          fill: FillType.HIGH,
          isPlaying: true,
          model: [
            [0, 1],
            [1, 0],
          ],
        },
        user: {
          userData: null,
        },
      };

      saveToLocalStorage(GAME_KEY, JSON.stringify(defaultState));

      return expectSaga(getGameStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, GAME_KEY)
        .put(SizeActionCreator.setSize(BoardSize.SMALL))
        .put(SpeedActionCreator.setSpeed(SpeedType.SLOW))
        .put(FillActionCreator.setFill(FillType.HIGH))
        .put(IsPlayingActionCreator.startPlaying())
        .put(
          ModelActionCreator.setModel([
            [0, 1],
            [1, 0],
          ])
        )
        .hasFinalState(fullState)
        .run();
    });
  });

  it('actionsWatcher', () => {
    const zeroMatrix: Model = Array.from({ length: 50 }, () =>
      Array.from({ length: 70 }, () => 0)
    );

    const model = zeroMatrix.map((row) => [...row]);
    model[0][0] = 1;

    testSaga(actionsWatcher)
      .next()
      .takeEvery(SizeActionCreator.setSize.type, saveGameStateToLocalStorage)
      .next()
      .takeEvery(SpeedActionCreator.setSpeed.type, saveGameStateToLocalStorage)
      .next()
      .takeEvery(FillActionCreator.setFill.type, saveGameStateToLocalStorage)
      .next()
      .takeEvery(ModelActionCreator.setModel.type, saveGameStateToLocalStorage)
      .next()
      .takeEvery(
        ModelActionCreator.updateModel.type,
        saveGameStateToLocalStorage
      )
      .next()
      .takeEvery(
        IsPlayingActionCreator.startPlaying.type,
        saveGameStateToLocalStorage
      )
      .next()
      .takeEvery(
        IsPlayingActionCreator.stopPlaying.type,
        saveGameStateToLocalStorage
      )
      .next()
      .takeEvery(SizeActionCreator.setSize.type, createModel)
      .next()
      .takeEvery(FillActionCreator.setFill.type, createModel)
      .next()
      .takeEvery(ModelActionCreator.setModel.type, stopPlaying)
      .next()
      .isDone();

    return expectSaga(actionsWatcher)
      .withReducer(reducer)
      .dispatch({ type: 'speed/setSpeed', payload: SpeedType.SLOW })
      .dispatch({ type: 'isPlaying/startPlaying' })
      .dispatch({ type: 'model/setModel', payload: zeroMatrix })
      .dispatch({ type: 'model/updateModel', payload: { x: 0, y: 0 } })
      .hasFinalState({
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.SLOW,
          fill: FillType.MEDIUM,
          isPlaying: false,
          model,
        },
        user: { userData: null },
      })
      .silentRun();
  });

  it('gameStateSaga works correctly', () => {
    return expectSaga(gameStateSaga)
      .withReducer(reducer)
      .fork(createModel)
      .fork(play)
      .fork(getGameStateFromLocalStorage)
      .fork(actionsWatcher)
      .silentRun();
  });
});
