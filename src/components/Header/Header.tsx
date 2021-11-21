import React, { FC } from 'react';
import styled from '@emotion/styled';
import { UserType } from '@/modules/user';

const Wrapper = styled.div`
  align-self: stretch;
`;

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  color: #ffffff;
`;

const LogoutItem = styled.span`
  cursor: pointer;

  &:hover {
    color: #058aba;
  }
`;

export interface HeaderPropsType {
  /**
   * user name
   */
  user: UserType;
  /**
   * dispatches logout action
   */
  signout: () => void;
}

export const Header: FC<HeaderPropsType> = ({ user, signout }) => {
  return (
    <Wrapper>
      {user && (
        <Title>
          <span data-testid='user'>Hello, {user}! </span>
          <LogoutItem onClick={signout}>Logout</LogoutItem>
        </Title>
      )}
    </Wrapper>
  );
};
