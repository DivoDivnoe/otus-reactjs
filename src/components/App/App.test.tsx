import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, { AppProps, User } from './App';

describe('App', () => {
  it('handles click event correctly', async () => {
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
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    );

    global.fetch = mockFetch;

    render(<App {...mocks} />);

    await waitFor(() => mockFetch());

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.getByText('1.1')).toBeInTheDocument();

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.queryByText('1.1')).toBeNull();
  });
});
