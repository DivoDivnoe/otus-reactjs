import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InteractiveStartPopup } from '@/modules/user';

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(32, 61, 227, 1) 0%,
    rgba(10, 38, 69, 1) 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(8, 0, 18, 0.85);
  }
`;

export const SigninScreen: FC = () => {
  return (
    <ErrorBoundary>
      <PopupWrapper>
        <InteractiveStartPopup />
      </PopupWrapper>
    </ErrorBoundary>
  );
};
