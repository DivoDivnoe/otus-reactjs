import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import { InteractiveBar } from './InteractiveBar';
import { BoardSize } from './size';
import { SpeedType } from './speed';
import { FillType } from './fill';
import reducer from '@/reducer';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('InteractiveBar test cases', () => {
  it('InteractiveBar check', () => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(store.getState());
    });

    const store = configureStore({ reducer });

    const { asFragment } = render(
      <Provider store={store}>
        <InteractiveBar />
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
  });
});
