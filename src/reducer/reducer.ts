import { combineReducers, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  ActionCreator as ModelActionCreator,
  getModel,
} from '@/modules/game/model';
import {
  ActionCreator as SizeActionCreator,
  getSize,
} from '@/modules/game/size';
import {
  ActionCreator as SpeedActionCreator,
  getSpeed,
} from '@/modules/game/speed';

import {
  ActionCreator as FillActionCreator,
  getFill,
} from '@/modules/game/fill';

import {
  ActionCreator as IsPlayingActionCreator,
  getIsPlaying,
} from '@/modules/game/isPlaying';
import gameReducer, {
  GameState,
  NAME_SPACE as GAME_NAME_SPACE,
} from '@/modules/game';
import userReducer, {
  ActionCreator as UserActionCreator,
  UserState,
  getUser,
  NAME_SPACE as USER_NAME_SPACE,
} from '@/modules/user';
import { APP_KEY } from './constants';

export interface State {
  [GAME_NAME_SPACE]: GameState;
  [USER_NAME_SPACE]: UserState;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, AnyAction>;

export const Operation = {
  getStateFromLocalStorage: (): ThunkResult<void> => {
    return (dispatch) => {
      const rawState = window.localStorage.getItem(APP_KEY);

      if (rawState) {
        const state: State = JSON.parse(rawState);

        dispatch(UserActionCreator.signin(getUser(state)));
        dispatch(SizeActionCreator.setSize(getSize(state)));
        dispatch(SpeedActionCreator.setSpeed(getSpeed(state)));
        dispatch(FillActionCreator.setFill(getFill(state)));
        dispatch(ModelActionCreator.setModel(getModel(state)));
        dispatch(IsPlayingActionCreator.setPlaying(getIsPlaying(state)));
      }
    };
  },
  saveStateToLocalStorage: (): ThunkResult<void> => {
    return (_dispatch, getState) => {
      const serializedState = JSON.stringify(getState());

      window.localStorage.setItem(APP_KEY, serializedState);
    };
  },
};

const reducer = combineReducers({
  [GAME_NAME_SPACE]: gameReducer,
  [USER_NAME_SPACE]: userReducer,
});

export default reducer;
