import React, { FC } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Game } from '@/modules/game';
import { InteractiveHeader } from '@/modules/user/InteractiveHeader';
import { getGameModule } from '@/modules/game';

const dynamicReduxModules = [getGameModule()];

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: radial-gradient(
    ellipse at center,
    rgba(32, 61, 227, 1) 0%,
    rgba(10, 38, 69, 1) 100%
  );
`;

export const GameScreen: FC = () => {
  return (
    <ErrorBoundary>
      <Wrapper>
        <div>
          <InteractiveHeader />
          <DynamicModuleLoader modules={dynamicReduxModules}>
            <Game />
          </DynamicModuleLoader>
        </div>
      </Wrapper>
    </ErrorBoundary>
  );
};
