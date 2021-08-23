import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { AppProps } from './App';

describe('App', () => {
  it('handles click event correctly', async () => {
    const mocks: AppProps = {
      size: {
        width: 2,
        height: 2,
      },
    };
    render(<App {...mocks} />);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.getByText('1.1')).toBeInTheDocument();

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.queryByText('1.1')).toBeNull();
  });
});
