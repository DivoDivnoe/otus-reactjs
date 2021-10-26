import { renderHook, act } from '@testing-library/react-hooks';
import useGameLogic from './useGameLogicRedux';
import { SpeedType, CellState } from '@/constants';
import { SpeedValue } from '@/configs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';
import React, { FC } from 'react';

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

    const { model, clickHandler } = result.current;

    const mockCoords = { x: 11, y: 29 };
    const cellState = model[mockCoords.y][mockCoords.x];

    act(() => clickHandler(mockCoords));
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
