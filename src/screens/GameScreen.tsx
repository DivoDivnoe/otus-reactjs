import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InteractiveGame } from '@/modules/game';
import { Header, HeaderPropsType } from '@/components/Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameScreen: FC<HeaderPropsType> = ({ user, signout }) => {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Header user={user} signout={signout} />
        <InteractiveGame />
      </Wrapper>
    </ErrorBoundary>
  );
};
