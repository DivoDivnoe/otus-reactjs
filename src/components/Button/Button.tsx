import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  clickHandler?: () => void;
}

const ButtonItem = styled.button`
  position: relative;
  box-sizing: border-box;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 16px;
  line-height: 22px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${(props: Omit<ButtonProps, 'clickHandler'>) => {
    if (props.isActive) {
      return '#ffffff';
    }

    return props.isDisabled ? '#8c8c8c' : '#058aba';
  }};
  text-align: center;
  border: ${(props: Omit<ButtonProps, 'clickHandler'>) => {
    if (props.isActive) {
      return 'none';
    }

    return `2px solid ${props.isDisabled ? '#8c8c8c' : '#058aba'}`;
  }};
  border-radius: 6px;
  background-color: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isActive ? '#058aba' : 'transparent'};
  pointer-events: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isDisabled ? 'none' : 'auto'};
  cursor: pointer;

  &:hover {
    background-color: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
      props.isActive ? '#006C93' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Button: FC<ButtonProps> = ({
  isActive,
  isDisabled,
  clickHandler,
  children,
}) => {
  return (
    <ButtonItem
      isDisabled={isDisabled}
      isActive={isActive}
      onClick={clickHandler}
    >
      {children}
    </ButtonItem>
  );
};

export default Button;
