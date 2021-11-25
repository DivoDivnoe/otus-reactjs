import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import { InteractiveHeader } from './InteractiveHeader';
import reducer from '@/reducer';
import { act } from 'react-dom/test-utils';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('InteractiveHeader test cases', () => {
  it('InteractiveHeader check', () => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(store.getState());
    });

    const store = configureStore({ reducer });
    act(() => {
      store.dispatch({
        type: 'user/signin',
        payload: 'Andrey',
      });
    });

    const { asFragment } = render(
      <Provider store={store}>
        <InteractiveHeader />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(screen.getByText('Logout'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'user/signout',
    });
  });
});
