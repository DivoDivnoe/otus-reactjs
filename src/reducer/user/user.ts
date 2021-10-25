import { UserType } from '@/hooks/useAuth';
import { Action, AnyAction } from 'redux';
import { ActionType } from '../constants';

export interface UserState {
  userData: UserType;
}

export interface UserActionCreator {
  setUser: (user: UserType) => AnyAction;
  resetUser: () => Action;
}

const initialState = {
  userData: null,
};
Object.freeze(initialState);

export const ActionCreator: UserActionCreator = {
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
  resetUser: () => ({
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
