import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BoardSize, FillType, SpeedType } from '@/constants';
import { LogicProps } from '@/hocs/withGameLogicHOC';

jest.mock('@/api/api');

describe('App', () => {
  it('works correctly', async () => {
    const mocks: LogicProps = {
      size: 'small' as BoardSize,
      speed: 'slow' as SpeedType,
      fill: 'medium' as FillType,
    };

    render(<App {...mocks} />);
  });
});
