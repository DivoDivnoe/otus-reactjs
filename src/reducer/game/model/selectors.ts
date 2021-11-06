import NameSpace from '@/reducer/nameSpace';
import { State } from '@/reducer';
import { Model } from '@/reducer/game/model';

const NAME_SPACE = NameSpace.GAME;

export const getModel = (state: State): Model => state[NAME_SPACE].model;
