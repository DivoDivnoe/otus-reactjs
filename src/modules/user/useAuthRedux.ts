import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreator as UserActionCreator } from '@/modules/user';
import { StartPopupProps } from '@/components/StartPopup';

const useAuth = (): StartPopupProps => {
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
