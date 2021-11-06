import NameSpace from '../nameSpace';
import { State } from '@/reducer';
import { UserType } from './';

const NAME_SPACE = NameSpace.USER;

export const getUser = (state: State): UserType => state[NAME_SPACE].userData;
