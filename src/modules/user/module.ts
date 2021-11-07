import { ISagaModule } from 'redux-dynamic-modules-saga';
import reducer, { NAME_SPACE } from './';
import { userStateSaga } from './saga';

export const getSigninModule = (): ISagaModule<typeof reducer> => {
  return {
    id: 'Signin',
    reducerMap: {
      [NAME_SPACE]: reducer,
    },
    sagas: [userStateSaga],
  };
};
