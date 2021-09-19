import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children?: string;
  isActive: boolean;
  isDisabled?: boolean;
  clickHandler: () => void;
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
  color: #058aba;
  text-align: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid #058aba;
  background-color: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isActive ? 'lightblue' : '#058aba'};
  background-color: transparent;
  pointer-events: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isDisabled ? 'none' : 'auto'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
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
