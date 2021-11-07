import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getSigninModule } from './modules/user';
import { getGameModule } from './modules/game';

import { App } from '@/App';
import reducer from '@/reducer';
import { gameStateSaga } from '@/modules/game/saga';
import { userStateSaga } from './modules/user/saga';
import 'normalize.css';
import '@/style.css';

const sagaMiddleWare = createSagaMiddleware();

export type GameState = ReturnType<typeof reducer>;

// const store = createStore<GameState>(
//   { extensions: [getSagaExtension({})] },
//   getSigninModule(),
//   getGameModule()
// );

const store = configureStore({
  reducer,
  middleware: [sagaMiddleWare],
  devTools: true,
});

function* rootSaga() {
  yield fork(userStateSaga);
  yield fork(gameStateSaga);
}

sagaMiddleWare.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
