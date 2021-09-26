import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withUserDataHOC, { WithUserProps } from './withUserDataHOC';

describe('withUserDataHOC', () => {
  it('renders component correctly', () => {
    const MockComponent: FC<WithUserProps> = ({ user, setUser }) => {
      return (
        <div data-testid='mockComponent'>
          {user && <h1>hello, {user}</h1>}
          <input onChange={(evt) => setUser(evt.target.value)} />
        </div>
      );
    };
    const MockComponentWithUserData = withUserDataHOC(MockComponent);

    render(<MockComponentWithUserData />);
    expect(screen.getByTestId('mockComponent')).toBeInTheDocument();
  });

  it('user by default is null', () => {
    const MockComponent: FC<WithUserProps> = ({ user, setUser }) => {
      return (
        <div data-testid='mockComponent'>
          {user && <h1 data-testid='title'>hello, {user}</h1>}
          <input onChange={(evt) => setUser(evt.target.value)} />
        </div>
      );
    };
    const MockComponentWithUserData = withUserDataHOC(MockComponent);

    render(<MockComponentWithUserData />);
    expect(screen.queryByTestId('title')).toBeNull();
  });

  it('returned component sets user correctly', () => {
    const MockComponent: FC<WithUserProps> = ({ user, setUser }) => {
      return (
        <div data-testid='mockComponent'>
          {user && <h1 data-testid='title'>hello, {user}</h1>}
          <input
            data-testid='input'
            onChange={(evt) => setUser(evt.target.value)}
          />
        </div>
      );
    };
    const MockComponentWithUserData = withUserDataHOC(MockComponent);

    render(<MockComponentWithUserData />);
    userEvent.type(screen.getByTestId('input'), 'Andrey');
    expect(screen.getByText('hello, Andrey')).toBeInTheDocument();
  });
});
