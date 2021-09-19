import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children?: string;
  isActive: boolean;
  isDisabled?: boolean;
  clickHandler: () => void;
}

const ButtonItem = styled.button`
  box-sizing: border-box;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 16px;
  line-height: 22px;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  text-align: center;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  background-color: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isActive ? 'lightblue' : 'blue'};
  pointer-events: ${(props: Omit<ButtonProps, 'clickHandler'>) =>
    props.isDisabled ? 'none' : 'auto'};
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
