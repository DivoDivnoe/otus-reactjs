import React, { FC } from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import reducer from '@/reducer';

describe('PrivateRoute test', () => {
  it('renders Login component if no user defined', () => {
    const store = configureStore({ reducer });
    const MockComponent: FC = () => <div>MockComponent</div>;
    const MockLogin: FC = () => <div>Login</div>;

    render(
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login'>
              <MockLogin />
            </Route>
            <PrivateRoute path='/'>
              <MockComponent />
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders child component if user is defined', () => {
    const store = configureStore({ reducer });
    const MockComponent: FC = () => <div>MockComponent</div>;

    act(() => {
      store.dispatch({
        type: 'user/signin',
        payload: 'Andrey',
      });
    });

    render(
      <Provider store={store}>
        <Router>
          <PrivateRoute path='/'>
            <MockComponent />
          </PrivateRoute>
        </Router>
      </Provider>
    );
    expect(screen.getByText('MockComponent')).toBeInTheDocument();
  });
});
