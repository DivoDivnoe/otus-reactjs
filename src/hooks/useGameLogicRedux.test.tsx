import { renderHook, act } from '@testing-library/react-hooks';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import useGameLogic from './useGameLogicRedux';
import { CellState } from '@/reducer/game/model';
import { SpeedType, SpeedValue } from '@/reducer/game/speed';
import reducer from '@/reducer';
import { createRandomMatrix } from '@/core';
import { BoardSize } from '@/reducer/game/size';
import { FillType } from '@/reducer/game/fill';

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

  it('should update state with speed interval', () => {
    const mockFn = jest.fn();
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    const timeMustPass = 1000;
    const interval = SpeedValue[SpeedType.MEDIUM];

    const moveTimersByTime = (): void => {
      for (let i = 0; i < timeMustPass; i += interval) {
        result.current.updateModel = mockFn();

        act(() => {
          jest.advanceTimersByTime(interval);
        });
      }
    };
    jest.useFakeTimers();

    moveTimersByTime();
    expect(mockFn).toHaveBeenCalledTimes(7);
  });

  it('handles clickHandler correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameLogic(), { wrapper });

    const { updateModel } = result.current;
    const model = createRandomMatrix(BoardSize.SMALL, FillType.LOW);
    act(() => updateModel(model));

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
});
