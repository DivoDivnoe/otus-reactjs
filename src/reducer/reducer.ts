import { combineReducers } from 'redux';

import gameReducer, {
  GameState,
  NAME_SPACE as GAME_NAME_SPACE,
} from '@/modules/game';
import userReducer, {
  UserState,
  NAME_SPACE as USER_NAME_SPACE,
} from '@/modules/user';

export interface State {
  [GAME_NAME_SPACE]: GameState;
  [USER_NAME_SPACE]: UserState;
}

const reducer = combineReducers({
  [GAME_NAME_SPACE]: gameReducer,
  [USER_NAME_SPACE]: userReducer,
});

export default reducer;
