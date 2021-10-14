import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';
import { FillType } from '@/constants';

const NAME_SPACE = NameSpace.GAME;

export const getSize = (state: State): FillType => state[NAME_SPACE].fill;
