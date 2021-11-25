import React, { FC } from 'react';
import styled from '@emotion/styled';
import { InteractiveField } from './InteractiveField';
import { InteractiveBar } from './InteractiveBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Game: FC = () => {
  return (
    <Wrapper>
      <InteractiveField />
      <InteractiveBar />
    </Wrapper>
  );
};
