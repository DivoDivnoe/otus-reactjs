import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { App } from '@/App';
import reducer from '@/reducer';
import { stateSaga } from '@/reducer/saga';
import 'normalize.css';
import '@/style.css';

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleWare],
  devTools: true,
});

function* rootSaga() {
  yield fork(stateSaga);
}

sagaMiddleWare.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
