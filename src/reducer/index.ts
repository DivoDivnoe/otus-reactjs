import { combineReducers } from 'redux';
import NameSpace from './nameSpace';
import userReducer, { UserState } from './user/user';
import gameReducer, { GameState } from '@/reducer/game';

export interface State {
  [NameSpace.GAME]: GameState;
  [NameSpace.USER]: UserState;
}

const reducer = combineReducers({
  [NameSpace.GAME]: gameReducer,
  [NameSpace.USER]: userReducer,
});

export default reducer;
