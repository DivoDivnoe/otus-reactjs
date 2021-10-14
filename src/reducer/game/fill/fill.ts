import { AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';
import { FillType } from '@/constants';
import { gameProps } from '@/configs';

export interface GameFillActionCreator {
  SET_FILL: (fill: FillType) => AnyAction;
}

const initialState: FillType = gameProps.fill;

export const ActionCreator: GameFillActionCreator = {
  SET_FILL: (fill: FillType) => ({
    type: ActionType.SET_FILL,
    payload: fill,
  }),
};

const reducer = (
  state: FillType = initialState,
  action: AnyAction
): FillType => {
  switch (action.type) {
    case ActionType.SET_FILL:
      return action.payload;
  }

  return state;
};

export default reducer;
