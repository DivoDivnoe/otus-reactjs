import { ISagaModule } from 'redux-dynamic-modules-saga';
import reducer, { NAME_SPACE } from './';
import { gameStateSaga } from './saga';

export const getGameModule = (): ISagaModule<typeof reducer> => {
  return {
    id: 'Game',
    reducerMap: {
      [NAME_SPACE]: reducer,
    },
    sagas: [gameStateSaga],
  };
};
