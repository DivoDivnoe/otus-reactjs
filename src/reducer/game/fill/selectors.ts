import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';
import { FillType } from './';

const NAME_SPACE = NameSpace.GAME;

export const getFill = (state: State): FillType => state[NAME_SPACE].fill;
