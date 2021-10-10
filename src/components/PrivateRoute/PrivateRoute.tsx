import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute: FC<Record<string, unknown>> = ({
  children,
  user,
  ...rest
}) => {
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
