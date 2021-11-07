import React, { FC, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StartPopup } from '@/modules/user/StartPopup';
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
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [user]);

  return (
    <Switch>
      <Route path='/login'>
        <SigninScreen />
      </Route>
      <PrivateRoute path='/' user='user'>
        <GameScreen user={user} signout={signout} />
      </PrivateRoute>
    </Switch>
  );
};

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
};
