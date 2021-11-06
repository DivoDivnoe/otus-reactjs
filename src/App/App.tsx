import React, { FC, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StartPopup } from '@/modules/user/StartPopup';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/Header';
import { InteractiveGame } from '@/modules/game';
import { State } from '@/reducer';
import {
  getUser,
  UserType,
  ActionCreator as UserActionCreator,
} from '@/modules/user';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
        <StartPopup />
      </Route>
      <PrivateRoute path='/' user='user'>
        <Wrapper>
          <Header user={user} signout={signout} />
          <InteractiveGame />
        </Wrapper>
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
