import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartPopup, PopupProps } from './StartPopup';

describe('StartPopup', () => {
  it('is rendered correctly', () => {
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    const { asFragment } = render(<StartPopup {...mocks} />);
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('input is empty', () => {
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<StartPopup {...mocks} />);
    expect(screen.getByTestId('name-input')).toHaveValue('');
  });

  it('handles change event correctly', () => {
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<StartPopup {...mocks} />);
    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
  });

  it('handles submit event correctly', () => {
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<StartPopup {...mocks} />);
    userEvent.type(screen.getByTestId('name-input'), 'Andrey');
    fireEvent.submit(screen.getByTestId('start-form'));
    expect(mocks.submitHandler).toHaveBeenCalledWith('Andrey');
  });
});
