import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Field } from '@/components/Field';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Bar } from '@/components/Bar';
import { StartPopup } from '@/components/StartPopup';
import useAuth from '@/hooks/useAuthRedux';
import useGameLogic from '@/hooks/useGameLogicRedux';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Logout } from '@/components/Logout';

const Title = styled.h1`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AppRoutes: FC = () => {
  const {
    size,
    speed,
    fill,
    sizes,
    speedTypes,
    fillTypes,
    changeSize,
    changeSpeed,
    changeFill,
    play,
    pause,
    isPlaying,
    model,
    clickHandler,
    clear,
  } = useGameLogic();
  const { user, signin, signout } = useAuth();

  return (
    <Switch>
      <Route path='/login'>
        <StartPopup submitHandler={signin} />
      </Route>
      <PrivateRoute path='/' user='user'>
        <Wrapper>
          {user && (
            <Title>
              Hello, {user}! <Logout logout={signout} />
            </Title>
          )}
          <Field size={size} model={model} clickHandler={clickHandler} />
          <Bar
            sizes={sizes}
            speedTypes={speedTypes}
            fillTypes={fillTypes}
            size={size}
            speed={speed}
            fill={fill}
            isPlaying={isPlaying}
            changeSizeHandler={changeSize}
            changeSpeedHandler={changeSpeed}
            changeFillType={changeFill}
            play={play}
            pause={pause}
            clear={clear}
          />
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
