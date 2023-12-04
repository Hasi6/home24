import React from 'react';
import { screen } from '@testing-library/react';

import ErrorBoundary from '@/components/hoc/ErrorBoundary';
import { render } from '@/utils/test/render';

const Child = () => null;
const ErrorChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('should render children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Oops, something went wrong.')).not.toBeInTheDocument();
  });

  it('should render error message when child throws error', () => {
    // Mock console to prevent error logs during tests
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops, something went wrong.')).toBeInTheDocument();

    // Restore console log after test
    consoleSpy.mockRestore();
  });
});
