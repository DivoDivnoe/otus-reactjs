import { IModule } from 'redux-dynamic-modules';
import reducer, { NAME_SPACE } from './';

export const getSigninModule = (): IModule<typeof reducer> => {
  return {
    id: 'Signin',
    reducerMap: {
      [NAME_SPACE]: reducer,
    },
  };
};
