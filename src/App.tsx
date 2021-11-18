import React, { FC, useCallback } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import history from '@/history';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/components/PrivateRoute';
import { State } from '@/reducer';
import {
  getUser,
  UserType,
  ActionCreator as UserActionCreator,
} from '@/modules/user';
import { GameScreen } from '@/screens/GameScreen';
import { SigninScreen } from '@/screens/SigninScreen';

export const AppRoutes: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector<State, UserType>(getUser);
  const signout = useCallback(() => dispatch(UserActionCreator.signout()), []);

  return (
    <Switch>
      <Route path='/login'>
        <SigninScreen />
      </Route>
      <PrivateRoute path='/' user={user}>
        <GameScreen user={user} signout={signout} />
      </PrivateRoute>
    </Switch>
  );
};

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
};
