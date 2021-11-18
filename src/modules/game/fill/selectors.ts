import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';
import { FillType } from '.';

export const getFill = (state: State): FillType => state[NAME_SPACE].fill;
