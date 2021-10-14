import { UserType } from '@/hooks/useAuth';
import { Action, AnyAction } from 'redux';
import { ActionType } from '../constants';

export interface UserState {
  userData: UserType;
}

export interface UserActionCreator {
  SET_USER: (user: UserType) => AnyAction;
  RESET_USER: () => Action;
}

const initialState = {
  userData: null,
};
Object.freeze(initialState);

export const ActionCreator: UserActionCreator = {
  SET_USER: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
  RESET_USER: () => ({
    type: ActionType.RESET_USER,
  }),
};

const reducer = (
  state: UserState = initialState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userData: action.payload };
    case 'RESET_USER':
      return { ...initialState };
  }

  return state;
};

export default reducer;
