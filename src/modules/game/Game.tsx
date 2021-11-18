import React, { FC } from 'react';
import { InteractiveField } from './InteractiveField';
import { InteractiveBar } from './InteractiveBar';

export const Game: FC = () => {
  return (
    <div>
      <InteractiveField />
      <InteractiveBar />
    </div>
  );
};
