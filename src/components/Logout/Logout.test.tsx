import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Logout, LogoutProps } from './Logout';

describe('Logout', () => {
  it('renders correctly', () => {
    const mocks: LogoutProps = {
      logout: jest.fn(),
    };

    const { asFragment } = render(<Logout {...mocks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles click event correctly', () => {
    const mocks: LogoutProps = {
      logout: jest.fn(),
    };
    render(<Logout {...mocks} />);

    fireEvent.click(screen.getByText('Выйти'));
    expect(mocks.logout).toHaveBeenCalledTimes(1);
  });
});
