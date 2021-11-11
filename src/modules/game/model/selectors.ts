import { createSelector } from 'reselect';
import { NAME_SPACE } from '@/modules/game/nameSpace';
import { State } from '@/reducer';
import { Model } from '@/modules/game/model';
import { getNextGenMatrix, createZeroMatrix } from '@/modules/game/core';
import { getSize } from '@/modules/game/size';

export const getModel = (state: State): Model => state[NAME_SPACE].model;
export const getNextGenModel = createSelector(getModel, getNextGenMatrix);
export const getZeroMatrix = createSelector(getSize, createZeroMatrix);
