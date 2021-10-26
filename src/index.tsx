import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { App } from '@/components/App';
import reducer from '@/reducer';
import { Operation } from './reducer';
import 'normalize.css';
import '@/style.css';

const store = configureStore({ reducer, devTools: true });
store.dispatch(Operation.getStateFromLocalStorage());

render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <App />,
  document.querySelector('#root')
);
