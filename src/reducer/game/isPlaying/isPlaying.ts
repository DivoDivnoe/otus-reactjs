import { Action } from 'redux';
import { ActionType } from '@/reducer/constants';

export interface GameIsPlayingActionCreator {
  START_PLAYING: () => Action;
  STOP_PLAYING: () => Action;
}

const initialState = false;

export const ActionCreator: GameIsPlayingActionCreator = {
  START_PLAYING: () => ({
    type: ActionType.START_PLAYING,
  }),
  STOP_PLAYING: () => ({
    type: ActionType.STOP_PLAYING,
  }),
};

const reducer = (state: boolean = initialState, action: Action): boolean => {
  switch (action.type) {
    case ActionType.START_PLAYING:
      return true;
    case ActionType.STOP_PLAYING:
      return false;
  }

  return state;
};

export default reducer;
