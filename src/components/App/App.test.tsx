import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { AppProps, User } from './App';
import { fetchUser, FetchUser } from '@/api/api';

jest.mock('@/api/api');

describe('App', () => {
  it('works correctly', async () => {
    const mocks: AppProps = {
      size: {
        width: 2,
        height: 2,
      },
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

  // it('handles click event correctly', async () => {
  //   const mocks: AppProps = {
  //     size: {
  //       width: 2,
  //       height: 2,
  //     },
  //   };

  //   const mockUser: User = {
  //     id: 1,
  //     name: 'Andrey',
  //   };

  //   const mockFetchUser = fetchUser as jest.MockedFunction<FetchUser>;
  //   mockFetchUser.mockResolvedValueOnce(mockUser);

  //   render(<App {...mocks} />);

  //   fireEvent.click(screen.queryAllByRole('cell')[3]);
  //   expect(screen.getByText('1.1')).toBeInTheDocument();

  //   fireEvent.click(screen.queryAllByRole('cell')[3]);
  //   expect(screen.queryByText('1.1')).toBeNull();
  // });
});
