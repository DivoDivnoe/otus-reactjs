import { combineReducers } from 'redux';
import NameSpace from './nameSpace';
import gameReducer, { GameState } from '@/reducer/game';
import { APP_KEY } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import userReducer, {
  ActionCreator as UserActionCreator,
  UserState,
  getUser,
} from '@/reducer/user';
import {
  ActionCreator as ModelActionCreator,
  getModel,
} from '@/reducer/game/model';
import {
  ActionCreator as SizeActionCreator,
  getSize,
} from '@/reducer/game/size';
import {
  ActionCreator as SpeedActionCreator,
  getSpeed,
} from '@/reducer/game/speed';

import {
  ActionCreator as FillActionCreator,
  getFill,
} from '@/reducer/game/fill';

import {
  ActionCreator as IsPlayingActionCreator,
  getIsPlaying,
} from '@/reducer/game/isPlaying';

export interface State {
  [NameSpace.GAME]: GameState;
  [NameSpace.USER]: UserState;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, AnyAction>;

export const Operation = {
  getStateFromLocalStorage: (): ThunkResult<void> => {
    return (dispatch) => {
      const rawState = window.localStorage.getItem(APP_KEY);

      if (rawState) {
        const state: State = JSON.parse(rawState);

        dispatch(UserActionCreator.setUser(getUser(state)));
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
  [NameSpace.GAME]: gameReducer,
  [NameSpace.USER]: userReducer,
});

export default reducer;
