import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartPopup } from './StartPopup';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';

describe('StartPopup', () => {
  it('is rendered correctly', () => {
    const store = createStore(reducer);

    const { asFragment } = render(
      <Provider store={store}>
        <StartPopup />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('input is empty', () => {
    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <StartPopup />
      </Provider>
    );
    expect(screen.getByTestId('name-input')).toHaveValue('');
  });

  it('handles change event correctly', () => {
    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <StartPopup />
      </Provider>
    );
    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
  });

  it('clears input after submit', () => {
    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <StartPopup />
      </Provider>
    );
    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    fireEvent.submit(screen.getByTestId('start-form'));
    expect(screen.getByTestId('name-input')).toHaveValue('');
  });
});
