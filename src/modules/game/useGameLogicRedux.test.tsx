import { renderHook, act } from '@testing-library/react-hooks';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import useGameLogic from './useGameLogicRedux';
import {
  CellState,
  ActionCreator as ModelActionCreator,
} from '@/modules/game/model';
import { SpeedType } from '@/modules/game/speed';
import reducer from '@/reducer';
import { createRandomMatrix } from '@/modules/game/core';
import { BoardSize } from '@/modules/game/size';
import { FillType } from '@/modules/game/fill';

describe('useGameLogic hook', () => {
  it('should manage game isPlaying prop correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    const { play, pause, isPlaying } = result.current;
    expect(isPlaying).toEqual(false);

    act(play);
    expect(result.current.isPlaying).toEqual(true);

    act(pause);
    expect(result.current.isPlaying).toEqual(false);
  });

  it('handles clickHandler correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    const model = createRandomMatrix(BoardSize.SMALL, FillType.LOW);
    store.dispatch(ModelActionCreator.setModel(model));

    const mockCoords = { x: 11, y: 29 };
    const cellState = result.current.model[mockCoords.y][mockCoords.x];

    act(() => result.current.clickHandler(mockCoords));
    expect(result.current.model[mockCoords.y][mockCoords.x]).toEqual(
      cellState === CellState.ALIVE ? CellState.DEAD : CellState.ALIVE
    );
  });

  it('should clear game field correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });
    const { clear } = result.current;

    act(clear);

    const isEveryItemEqualsZero = result.current.model.every((row) => {
      return row.every((item) => item === CellState.DEAD);
    });
    expect(isEveryItemEqualsZero).toEqual(true);
  });

  it('should change size correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    act(() => result.current.changeSize(BoardSize.SMALL));
    expect(result.current.size).toBe(BoardSize.SMALL);
  });

  it('should change speed correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    const { changeSpeed } = result.current;
    result.current.pause = jest.fn();

    act(() => changeSpeed(SpeedType.FAST));
    expect(result.current.speed).toBe(SpeedType.FAST);
  });

  it('should change fill correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    act(() => result.current.changeFill(FillType.LOW));
    expect(result.current.fill).toBe(FillType.LOW);
  });
});
