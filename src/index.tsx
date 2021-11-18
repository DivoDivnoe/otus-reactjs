import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { App } from '@/App';

import 'normalize.css';
import '@/style.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
