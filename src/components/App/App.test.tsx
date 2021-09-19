import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { AppProps, User } from './App';
import { fetchUser, FetchUser } from '@/api/api';
import { BoardSize, FillType, SpeedType } from '@/constants';

jest.mock('@/api/api');

describe('App', () => {
  it('works correctly', async () => {
    const mocks: AppProps = {
      size: 'small' as BoardSize,
      speed: 'slow' as SpeedType,
      fill: 'medium' as FillType,
    };

    const mockUser: User = {
      id: 1,
      name: 'Andrey',
    };

    const mockFetchUser = fetchUser as jest.MockedFunction<FetchUser>;
    mockFetchUser.mockResolvedValueOnce(mockUser);

    render(<App {...mocks} />);
    expect(mockFetchUser).toHaveBeenCalledTimes(1);
  });
});
