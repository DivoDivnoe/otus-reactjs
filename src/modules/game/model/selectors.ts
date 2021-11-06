import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';
import { Model } from '@/modules/game/model';

export const getModel = (state: State): Model => state[NAME_SPACE].model;
