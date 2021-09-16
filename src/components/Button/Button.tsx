import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children?: string;
  isActive: boolean;
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
  background-color: ${(props: Pick<ButtonProps, 'isActive'>) =>
    props.isActive ? 'lightblue' : 'blue'};
  cursor: pointer;
`;

const Button: FC<ButtonProps> = ({ isActive, clickHandler, children }) => {
  return (
    <ButtonItem isActive={isActive} onClick={clickHandler}>
      {children}
    </ButtonItem>
  );
};

export default Button;
