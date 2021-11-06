import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';
import { SpeedType } from '.';

export const getSpeed = (state: State): SpeedType => state[NAME_SPACE].speed;
