import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

afterEach(cleanup);

describe('ErrorBoundary test', () => {
  it('Render ErrorMsgComponent Fallback if error', () => {
    const WrappedComponent = () => {
      throw new Error('Error!');
    };

    render(
      <ErrorBoundary>
        <WrappedComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('Render children if have no error', () => {
    const WrappedComponent = () => <div>No Error</div>;

    render(
      <ErrorBoundary>
        <WrappedComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('No Error')).toBeInTheDocument();
  });
});
