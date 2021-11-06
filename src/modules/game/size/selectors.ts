import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';
import { BoardSize } from '.';

export const getSize = (state: State): BoardSize => state[NAME_SPACE].size;
