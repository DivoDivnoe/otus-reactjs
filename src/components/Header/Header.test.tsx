import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header, HeaderPropsType } from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    const mocks: HeaderPropsType = {
      user: 'Andrey',
      signout: jest.fn(),
    };
    const { asFragment } = render(<Header {...mocks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles click event correctly', () => {
    const mocks: HeaderPropsType = {
      user: 'Andrey',
      signout: jest.fn(),
    };
    render(<Header {...mocks} />);

    fireEvent.click(screen.getByText('Logout'));
    expect(mocks.signout).toHaveBeenCalledTimes(1);
  });
});
