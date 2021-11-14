import React, { FC } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InteractiveGame } from '@/modules/game';
import { Header, HeaderPropsType } from '@/components/Header';

import { getGameModule } from '@/modules/game';

const dynamicReduxModules = [getGameModule()];

export const GameScreen: FC<HeaderPropsType> = ({ user, signout }) => {
  return (
    <ErrorBoundary>
      <div>
        <Header user={user} signout={signout} />
        <DynamicModuleLoader modules={dynamicReduxModules}>
          <InteractiveGame />
        </DynamicModuleLoader>
      </div>
    </ErrorBoundary>
  );
};
