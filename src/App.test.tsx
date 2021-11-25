import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { App } from './App';
import { createZeroMatrix } from '@/modules/game/core';
import { BoardSize } from './modules/game/size';
import reducer from '@/reducer';

describe('App component', () => {
  it('renders correctly not signed in', () => {
    const store = configureStore({ reducer });

    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly signed in', () => {
    const store = configureStore({ reducer });
    const model = createZeroMatrix(BoardSize.MEDIUM);

    act(() => {
      store.dispatch({ type: 'model/setModel', payload: model });
      store.dispatch({ type: 'user/signin', payload: 'Andrey' });
    });

    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
