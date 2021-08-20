import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { AppProps } from './App';

describe('App', () => {
  it('handles click event correctly', () => {
    const mocks: AppProps = {
      size: {
        width: 2,
        height: 2,
      },
    };
    render(<App {...mocks} />);

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.getByText('1.1')).toBeInTheDocument();

    fireEvent.click(screen.queryAllByRole('cell')[3]);
    expect(screen.queryByText('1.1')).toBeNull();
  });
});
