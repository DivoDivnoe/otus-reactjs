import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartPopup, StartPopupProps } from './StartPopup';

describe('StartPopup', () => {
  it('is rendered correctly', () => {
    const mockProps: StartPopupProps = {
      currentName: 'Andrey',
      signin: jest.fn(),
      setName: jest.fn(),
      resetName: jest.fn(),
    };

    const { asFragment } = render(<StartPopup {...mockProps} />);

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('input has right value', () => {
    const mockProps: StartPopupProps = {
      currentName: 'Andrey',
      signin: jest.fn(),
      setName: jest.fn(),
      resetName: jest.fn(),
    };

    render(<StartPopup {...mockProps} />);
    expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
  });

  it('handles change event correctly', () => {
    const mockProps: StartPopupProps = {
      currentName: '',
      signin: jest.fn(),
      setName: jest.fn(),
      resetName: jest.fn(),
    };

    render(<StartPopup {...mockProps} />);

    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    expect(mockProps.setName).toHaveBeenCalledTimes(6);
  });

  it('clears input after submit', () => {
    const mockProps: StartPopupProps = {
      currentName: '',
      signin: jest.fn(),
      setName: jest.fn(),
      resetName: jest.fn(),
    };

    render(<StartPopup {...mockProps} />);
    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    fireEvent.submit(screen.getByTestId('start-form'));
    expect(screen.getByTestId('name-input')).toHaveValue('');
  });
});
