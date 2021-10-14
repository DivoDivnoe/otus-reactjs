import { AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';
import { BoardSize } from '@/constants';
import { createZeroMatrix, Model } from '@/core/core';

export interface GameModelActionCreator {
  SET_MODEL: (model: Model) => AnyAction;
  RESET_MODEL: (size: BoardSize) => AnyAction;
}

const initialState: Model = [[]];

export const ActionCreator: GameModelActionCreator = {
  SET_MODEL: (model: Model) => ({
    type: ActionType.SET_MODEL,
    payload: model,
  }),
  RESET_MODEL: (size: BoardSize) => {
    const model = createZeroMatrix(size);

    return {
      type: ActionType.SET_MODEL,
      payload: model,
    };
  },
};

const reducer = (state: Model = initialState, action: AnyAction): Model => {
  switch (action.type) {
    case ActionType.SET_MODEL:
      return action.payload;
  }

  return state;
};

export default reducer;
