import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { App } from '.';

import store from '@/store';

describe('App', () => {
  it('renders correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId('start-form')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
  });

  it('signs in and signs out correctly', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId('start-form')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('name-input'), 'Andrey{enter}');
    expect(screen.queryByTestId('start-form')).toBeNull();
    expect(screen.getByText('Hello, Andrey!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Выйти'));
    expect(screen.queryByText('Выйти')).toBeNull();
    expect(screen.getByTestId('start-form')).toBeInTheDocument();
  });
});
