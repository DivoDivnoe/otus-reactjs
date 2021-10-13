import { Action } from 'redux';
import { ActionType } from '@/reducer/constants';

export interface GameIsPlayingState {
  isPlaying: boolean;
}

export interface GameIsPlayingActionCreator {
  START_PLAYING: () => Action;
  STOP_PLAYING: () => Action;
}

const initialState: GameIsPlayingState = {
  isPlaying: false,
};

export const ActionCreator: GameIsPlayingActionCreator = {
  START_PLAYING: () => ({
    type: ActionType.START_PLAYING,
  }),
  STOP_PLAYING: () => ({
    type: ActionType.STOP_PLAYING,
  }),
};

const reducer = (
  state: GameIsPlayingState = initialState,
  action: Action
): GameIsPlayingState => {
  switch (action.type) {
    case ActionType.START_PLAYING:
      return { ...state, isPlaying: true };
    case ActionType.STOP_PLAYING:
      return { ...state, isPlaying: false };
  }

  return state;
};

export default reducer;
