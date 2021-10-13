import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export type UserType = string | null;
type SetUserType = (user: UserType) => void;

interface UserStateType {
  user: UserType;
  signin: SetUserType;
  signout: () => void;
}

const useAuth = (): UserStateType => {
  const [user, setUser] = useState<string | null>(null);
  const history = useHistory();

  const signin = (name: UserType) => {
    localStorage.user = name;
    setUser(name);
  };

  const signout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    localStorage.user && signin(localStorage.user);
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
