import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InteractiveGame } from '@/modules/game';
import { Header, HeaderPropsType } from '@/components/Header';

import { getGameModule } from '@/modules/game';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const dynamicReduxModules = [getGameModule()];

export const GameScreen: FC<HeaderPropsType> = ({ user, signout }) => {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Header user={user} signout={signout} />
        <DynamicModuleLoader modules={dynamicReduxModules}>
          <InteractiveGame />
        </DynamicModuleLoader>
      </Wrapper>
    </ErrorBoundary>
  );
};
