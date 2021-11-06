import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/reducer';
import {
  getUser,
  ActionCreator as UserActionCreator,
  UserType,
} from '@/reducer/user';

interface UserStateType {
  user: UserType;
  signin: (user: UserType) => void;
  signout: () => void;
}

const useAuth = (): UserStateType => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector<State, UserType>(getUser);

  const signin = useCallback((user: UserType) => {
    dispatch(UserActionCreator.signin(user));
  }, []);
  const signout = useCallback(() => {
    dispatch(UserActionCreator.signout());
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
