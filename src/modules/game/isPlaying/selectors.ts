import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';

export const getIsPlaying = (state: State): boolean =>
  state[NAME_SPACE].isPlaying;
