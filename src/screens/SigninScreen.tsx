import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StartPopup } from '@/modules/user/StartPopup';

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 0, 18, 0.85);
`;

export const SigninScreen: FC = () => {
  return (
    <ErrorBoundary>
      <PopupWrapper>
        <StartPopup />
      </PopupWrapper>
    </ErrorBoundary>
  );
};
