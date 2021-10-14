import { AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';
import { BoardSize } from '@/constants';
import { gameProps } from '@/configs';

export interface GameSizeActionCreator {
  SET_SIZE: (size: BoardSize) => AnyAction;
}

const initialState: BoardSize = gameProps.boardSize;

export const ActionCreator: GameSizeActionCreator = {
  SET_SIZE: (size: BoardSize) => ({
    type: ActionType.SET_SIZE,
    payload: size,
  }),
};

const reducer = (
  state: BoardSize = initialState,
  action: AnyAction
): BoardSize => {
  switch (action.type) {
    case ActionType.SET_SIZE:
      return action.payload;
  }

  return state;
};

export default reducer;
