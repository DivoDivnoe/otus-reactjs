import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '@/components/Header';
import { State } from '@/reducer';
import { getUser, UserType, ActionCreator as UserActionCreator } from '.';

export const InteractiveHeader: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector<State, UserType>(getUser);
  const signout = useCallback(
    () => dispatch(UserActionCreator.signout()),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return <Header user={user} signout={signout} />;
};
