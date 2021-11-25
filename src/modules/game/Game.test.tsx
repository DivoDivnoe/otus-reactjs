import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useSelector, useDispatch } from 'react-redux';
import { Game } from './Game';
import { BoardSize } from './size';
import { SpeedType } from './speed';
import { FillType } from './fill';
import reducer from '@/reducer';
import { createZeroMatrix } from '@/modules/game/core';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Game test cases', () => {
  it('Game check', () => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(store.getState());
    });

    const store = configureStore({ reducer });
    const model = createZeroMatrix(BoardSize.MEDIUM);
    act(() => {
      store.dispatch({
        type: 'model/setModel',
        payload: model,
      });
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByRole('button', { name: 'Size: 50x30' }));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'size/setSize',
      payload: BoardSize.SMALL,
    });

    userEvent.click(screen.getByRole('button', { name: '30%' }));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'fill/setFill',
      payload: FillType.HIGH,
    });

    userEvent.click(screen.getByRole('button', { name: 'fast' }));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'speed/setSpeed',
      payload: SpeedType.FAST,
    });

    userEvent.click(screen.getAllByTestId('cell')[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'model/updateModel',
      payload: { x: 0, y: 0 },
    });
  });
});
