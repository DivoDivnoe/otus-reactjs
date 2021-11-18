import { NAME_SPACE } from './nameSpace';
import { State } from '@/reducer';
import { UserType } from '.';

export const getUser = (state: State): UserType => state[NAME_SPACE].userData;
