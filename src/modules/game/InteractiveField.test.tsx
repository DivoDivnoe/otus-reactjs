import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import { InteractiveField } from './InteractiveField';
import reducer from '@/reducer';
import { act } from 'react-dom/test-utils';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('InteractiveField test cases', () => {
  it('InteractiveField check', () => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(store.getState());
    });

    const store = configureStore({ reducer });
    act(() => {
      store.dispatch({
        type: 'model/setModel',
        payload: [
          [0, 0],
          [0, 0],
        ],
      });
    });

    const { asFragment } = render(
      <Provider store={store}>
        <InteractiveField />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getAllByTestId('cell')[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'model/updateModel',
      payload: { x: 0, y: 0 },
    });
  });
});
