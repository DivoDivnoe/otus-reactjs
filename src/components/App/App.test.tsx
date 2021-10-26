import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { AppRoutes } from './';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';

describe('AppRoutes', () => {
  it('renders correctly', async () => {
    const history = createMemoryHistory();
    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('start-form')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
  });

  it('signs in and signs out correctly', async () => {
    const history = createMemoryHistory();
    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
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
