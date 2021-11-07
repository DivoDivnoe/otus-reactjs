import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getSigninModule } from './modules/user';

import reducer from '@/reducer';

export type GameState = ReturnType<typeof reducer>;

const store = createStore<GameState>(
  { extensions: [getSagaExtension({})] },
  getSigninModule()
);

export default store;
