import { IModule } from 'redux-dynamic-modules';
import reducer, { NAME_SPACE } from './';

export const getGameModule = (): IModule<typeof reducer> => {
  return {
    id: 'Game',
    reducerMap: {
      [NAME_SPACE]: reducer,
    },
  };
};
