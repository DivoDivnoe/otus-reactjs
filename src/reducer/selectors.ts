import { UserState, NAME_SPACE as USER_NAME_SPACE } from '@/modules/user';
import { GameState, NAME_SPACE as GAME_NAME_SPACE } from '@/modules/game';
import { State } from '@/reducer';

export const getUserState = (state: State): UserState => state[USER_NAME_SPACE];
export const getGameState = (state: State): GameState => state[GAME_NAME_SPACE];
