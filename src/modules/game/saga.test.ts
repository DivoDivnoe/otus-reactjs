import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call, fork, select } from 'redux-saga/effects';
import { BoardSize, getSize, ActionCreator as SizeActionCreator } from './size';
import { SpeedType, ActionCreator as SpeedActionCreator } from './speed';
import { ActionCreator as ModelActionCreator, Model } from './model';
import { FillType, getFill, ActionCreator as FillActionCreator } from './fill';
import { ActionCreator as IsPlayingActionCreator } from './isPlaying';
import { createRandomMatrix } from '@/modules/game/core';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  createModel,
  saveGameStateToLocalStorage,
  getGameStateFromLocalStorage,
  actionsWatcher,
  gameStateSaga,
} from './saga';
import { getGameState } from '@/reducer/selectors';
import { GameState, NAME_SPACE as GAME_KEY } from './';

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

      return expectSaga(getGameStateFromLocalStorage)
        .withReducer(reducer)
        .call(getFromLocalStorage, GAME_KEY)
        .call(createRandomMatrix, BoardSize.MEDIUM, FillType.MEDIUM)
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
        .put(IsPlayingActionCreator.setPlaying(true))
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
    const model: Model = Array.from({ length: 50 }, () =>
      Array.from({ length: 70 }, () => 0)
    );
    return expectSaga(actionsWatcher)
      .withReducer(reducer)
      .dispatch({ type: 'speed/setSpeed', payload: SpeedType.SLOW })
      .dispatch({ type: 'isPlaying/startPlaying' })
      .dispatch({ type: 'model/resetModel', payload: BoardSize.MEDIUM })
      .hasFinalState({
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.SLOW,
          fill: FillType.MEDIUM,
          isPlaying: true,
          model,
        },
        user: { userData: null },
      })
      .run();
  });

  it('works correctly', () => {
    const generator = gameStateSaga();

    expect(generator.next().value).toEqual(fork(getGameStateFromLocalStorage));
    expect(generator.next().value).toEqual(fork(actionsWatcher));
    expect(generator.next().done).toBe(true);
  });
});
