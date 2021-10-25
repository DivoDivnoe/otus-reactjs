import { Action, AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';

export interface GameIsPlayingActionCreator {
  setPlaying: (isPlaying: boolean) => AnyAction;
  startPlaying: () => Action;
  stopPlaying: () => Action;
}

const initialState = false;

export const ActionCreator: GameIsPlayingActionCreator = {
  setPlaying: (isPlaying: boolean) => ({
    type: ActionType.SET_PLAYING,
    payload: isPlaying,
  }),
  startPlaying: () => ({
    type: ActionType.START_PLAYING,
  }),
  stopPlaying: () => ({
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
