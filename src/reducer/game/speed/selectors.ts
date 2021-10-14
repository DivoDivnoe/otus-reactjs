import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';
import { SpeedType } from '@/constants';

const NAME_SPACE = NameSpace.GAME;

export const getSpeed = (state: State): SpeedType => state[NAME_SPACE].speed;