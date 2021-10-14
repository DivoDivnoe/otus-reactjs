import { Action, AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';

export interface GameIsPlayingActionCreator {
  SET_PLAYING: (isPlaying: boolean) => AnyAction;
  START_PLAYING: () => Action;
  STOP_PLAYING: () => Action;
}

const initialState = false;

export const ActionCreator: GameIsPlayingActionCreator = {
  SET_PLAYING: (isPlaying: boolean) => ({
    type: ActionType.SET_PLAYING,
    payload: isPlaying,
  }),
  START_PLAYING: () => ({
    type: ActionType.START_PLAYING,
  }),
  STOP_PLAYING: () => ({
    type: ActionType.STOP_PLAYING,
  }),
};

const reducer = (state: boolean = initialState, action: AnyAction): boolean => {
  switch (action.type) {
    case ActionType.SET_PLAYING:
      return action.payload;
    case ActionType.START_PLAYING:
      return true;
    case ActionType.STOP_PLAYING:
      return false;
  }

  return state;
};

export default reducer;
