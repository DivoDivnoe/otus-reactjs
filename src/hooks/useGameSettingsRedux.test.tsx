import { renderHook, act } from '@testing-library/react-hooks';
import useGameSettings from './useGameSettingsRedux';
import { BoardSize, SpeedType, FillType } from '@/constants';
import { gameOptions } from '@/configs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';
import React, { FC } from 'react';

describe('useGameSettings hook', () => {
  it('should have correct default settings', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    const { size, speed, fill, sizes, speedTypes, fillTypes } = result.current;

    expect(size).toEqual(BoardSize.MEDIUM);
    expect(speed).toEqual(SpeedType.MEDIUM);
    expect(fill).toEqual(FillType.MEDIUM);
    expect(sizes).toBe(gameOptions.boardSizes);
    expect(speedTypes).toBe(gameOptions.speedTypes);
    expect(fillTypes).toBe(gameOptions.fillTypes);
  });

  it('should change game settings correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    const { changeSize, changeSpeed, changeFill } = result.current;

    act(() => changeSize(BoardSize.SMALL));
    expect(result.current.size).toBe(BoardSize.SMALL);

    act(() => changeSpeed(SpeedType.FAST));
    expect(result.current.speed).toBe(SpeedType.FAST);

    act(() => changeFill(FillType.HIGH));
    expect(result.current.fill).toBe(FillType.HIGH);
  });
});
