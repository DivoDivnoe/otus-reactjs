import React from 'react';
import { render } from '@testing-library/react';
import App, { AppProps } from './App';
import { BoardSize, FillType, SpeedType } from '@/constants';

jest.mock('@/api/api');

describe('App', () => {
  it('works correctly', async () => {
    const mocks: AppProps = {
      size: 'small' as BoardSize,
      speed: 'slow' as SpeedType,
      fill: 'medium' as FillType,
    };

    render(<App {...mocks} />);
  });
});
