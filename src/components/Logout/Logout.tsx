import React, { FC } from 'react';
import styled from '@emotion/styled';

const LogoutItem = styled.span`
  cursor: pointer;

  &:hover {
    color: #058aba;
  }
`;

export interface LogoutProps {
  logout: () => void;
}

export const Logout: FC<LogoutProps> = ({ logout }) => {
  return <LogoutItem onClick={logout}>Выйти</LogoutItem>;
};
