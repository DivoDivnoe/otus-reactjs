import { combineReducers } from 'redux';
import NameSpace from './nameSpace';
import gameReducer, { GameState } from '@/reducer/game';
import { APP_KEY } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import userReducer, {
  ActionCreator as UserActionCreator,
  UserState,
} from '@/reducer/user/user';
import { getUser } from '@/reducer/user/selectors';
import { ActionCreator as ModelActionCreator } from '@/reducer/game/model/model';
import { getModel } from '@/reducer/game/model/selectors';
import { ActionCreator as SizeActionCreator } from '@/reducer/game/size/size';
import { getSize } from '@/reducer/game/size/selectors';
import { ActionCreator as SpeedActionCreator } from '@/reducer/game/speed/speed';
import { getSpeed } from '@/reducer/game/speed/selectors';
import { ActionCreator as FillActionCreator } from '@/reducer/game/fill/fill';
import { getFill } from '@/reducer/game/fill/selectors';
import { ActionCreator as IsPlayingActionCreator } from '@/reducer/game/isPlaying/isPlaying';
import { getIsPlaying } from '@/reducer/game/isPlaying/selectors';
import { raw } from '@storybook/react';

export interface State {
  [NameSpace.GAME]: GameState;
  [NameSpace.USER]: UserState;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, AnyAction>;

export const Operation = {
  getStateFromLocalStorage: (): ThunkResult<void> => {
    return (dispatch) => {
      const rawState = window.localStorage.getItem(APP_KEY);
      console.log('raw state', rawState);

      if (rawState) {
        const state: State = JSON.parse(rawState);

        dispatch(UserActionCreator.SET_USER(getUser(state)));
        dispatch(SizeActionCreator.SET_SIZE(getSize(state)));
        dispatch(SpeedActionCreator.SET_SPEED(getSpeed(state)));
        dispatch(FillActionCreator.SET_FILL(getFill(state)));
        dispatch(ModelActionCreator.SET_MODEL(getModel(state)));
        dispatch(IsPlayingActionCreator.SET_PLAYING(getIsPlaying(state)));
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
