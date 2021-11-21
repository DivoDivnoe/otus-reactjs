import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '@/reducer';
import { getUser, UserType } from '@/modules/user';

export const PrivateRoute: FC<Record<string, unknown>> = ({
  children,
  ...rest
}) => {
  const user = useSelector<State, UserType>(getUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
