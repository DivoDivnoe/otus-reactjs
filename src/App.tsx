import React, { FC } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '@/history';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/modules/PrivateRoute';
import { GameScreen } from '@/screens/GameScreen';
import { SigninScreen } from '@/screens/SigninScreen';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router history={history}>
        <Switch>
          <Route path='/login'>
            <SigninScreen />
          </Route>
          <PrivateRoute path='/'>
            <GameScreen />
          </PrivateRoute>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
};
