import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withSignInDataHOC from './withSignInDataHOC';
import { PopupProps, FormProps } from '@/components/StartPopup/StartPopup';

describe('withSignInDataHOC', () => {
  it('renders component correctly', () => {
    const MockComponent: FC<FormProps> = ({ name, onChange, onSubmit }) => {
      return (
        <form data-testid='form' onSubmit={onSubmit}>
          <input type='text' value={name} onChange={onChange} />
        </form>
      );
    };
    const MockComponentWithSignInData = withSignInDataHOC(MockComponent);
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<MockComponentWithSignInData {...mocks} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('returned component has relevant input value', () => {
    const MockComponent: FC<FormProps> = ({ name, onChange, onSubmit }) => {
      return (
        <form data-testid='form' onSubmit={onSubmit}>
          <input
            data-testid='input'
            type='text'
            value={name}
            onChange={onChange}
          />
        </form>
      );
    };
    const MockComponentWithSignInData = withSignInDataHOC(MockComponent);
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<MockComponentWithSignInData {...mocks} />);
    userEvent.type(screen.getByTestId('input'), 'Hello,{space}Andrey!');
    expect(screen.getByTestId('input')).toHaveValue('Hello, Andrey!');
  });

  it('returned component handles submit event correctly', () => {
    const MockComponent: FC<FormProps> = ({ name, onChange, onSubmit }) => {
      return (
        <form data-testid='form' onSubmit={onSubmit}>
          <input
            data-testid='input'
            type='text'
            value={name}
            onChange={onChange}
          />
        </form>
      );
    };
    const MockComponentWithSignInData = withSignInDataHOC(MockComponent);
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<MockComponentWithSignInData {...mocks} />);
    userEvent.type(screen.getByTestId('input'), 'Hello,{space}Andrey!{enter}');
    expect(mocks.submitHandler).toHaveBeenCalledWith('Hello, Andrey!');
  });

  it('returned component has empty input after submit event correctly', () => {
    const MockComponent: FC<FormProps> = ({ name, onChange, onSubmit }) => {
      return (
        <form data-testid='form' onSubmit={onSubmit}>
          <input
            data-testid='input'
            type='text'
            value={name}
            onChange={onChange}
          />
        </form>
      );
    };
    const MockComponentWithSignInData = withSignInDataHOC(MockComponent);
    const mocks: PopupProps = {
      submitHandler: jest.fn(),
    };

    render(<MockComponentWithSignInData {...mocks} />);
    userEvent.type(screen.getByTestId('input'), 'Hello,{space}Andrey!{enter}');
    expect(screen.getByTestId('input')).toHaveValue('');
  });
});
