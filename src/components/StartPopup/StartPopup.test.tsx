import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartPopup, { PopupProps } from './StartPopup';

describe('StartPopup', () => {
  describe('renders correctly', () => {
    it('is rendered with truthy isVisible prop', () => {
      const mocks: PopupProps = {
        isVisible: true,
        submitHandler: jest.fn(),
      };

      render(<StartPopup {...mocks} />);
      expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    });

    it('is not rendered with falsy isVisible prop', () => {
      const mocks: PopupProps = {
        isVisible: false,
        submitHandler: jest.fn(),
      };

      render(<StartPopup {...mocks} />);
      expect(screen.queryByRole('button', { name: 'Start' })).toBeNull();
    });

    it('input is empty', () => {
      const mocks: PopupProps = {
        isVisible: true,
        submitHandler: jest.fn(),
      };

      render(<StartPopup {...mocks} />);
      expect(screen.getByTestId('name-input')).toHaveValue('');
    });
  });

  describe('handles events correctly', () => {
    it('change event', () => {
      const mocks: PopupProps = {
        isVisible: true,
        submitHandler: jest.fn(),
      };

      render(<StartPopup {...mocks} />);
      userEvent.type(screen.getByTestId('name-input'), 'Andrey');
      expect(screen.getByTestId('name-input')).toHaveValue('Andrey');
    });

    it('submit event', () => {
      const mocks: PopupProps = {
        isVisible: true,
        submitHandler: jest.fn(),
      };

      render(<StartPopup {...mocks} />);
      userEvent.type(screen.getByTestId('name-input'), 'Andrey');
      fireEvent.submit(screen.getByTestId('start-form'));
      expect(mocks.submitHandler).toHaveBeenCalledWith('Andrey');
    });
  });
});
