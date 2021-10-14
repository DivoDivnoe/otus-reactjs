import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';

const NAME_SPACE = NameSpace.GAME;

export const getIsPlaying = (state: State): boolean =>
  state[NAME_SPACE].isPlaying;
