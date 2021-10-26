import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/reducer';
import { getUser, ActionCreator as UserActionCreator } from '@/reducer/user';

export type UserType = string | null;
type SetUserType = (user: UserType) => void;

interface UserStateType {
  user: UserType;
  signin: SetUserType;
  signout: () => void;
}

const useAuth = (): UserStateType => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector<State, UserType>(getUser);

  const signin = useCallback((user: UserType) => {
    dispatch(UserActionCreator.setUser(user));
  }, []);
  const signout = useCallback(() => {
    dispatch(UserActionCreator.resetUser());
  }, []);

  useEffect(() => {
    if (user) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [user]);

  return {
    user,
    signin,
    signout,
  };
};

export default useAuth;
