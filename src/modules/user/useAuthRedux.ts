import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreator as UserActionCreator } from '@/modules/user';

interface UserStateType {
  currentName: string;
  signin: () => void;
  setName: (name: string) => void;
  resetName: () => void;
}

const useAuth = (): UserStateType => {
  const [name, setName] = useState<string>('');

  const dispatch = useDispatch();

  const resetName = () => setName('');
  const signin = () => {
    const user = name.trim();

    dispatch(UserActionCreator.signin(user.length ? user : null));
  };

  return {
    currentName: name,
    signin,
    setName,
    resetName,
  };
};

export default useAuth;
