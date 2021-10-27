import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';
import { BoardSize } from './';

const NAME_SPACE = NameSpace.GAME;

export const getSize = (state: State): BoardSize => state[NAME_SPACE].size;
