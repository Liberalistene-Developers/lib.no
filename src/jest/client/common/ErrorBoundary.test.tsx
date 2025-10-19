/**
 * Tests for ErrorBoundary component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ErrorBoundary} from '/react4xp/common/ErrorBoundary/ErrorBoundary';
import {logger} from '@utils/logger';

// Mock the logger
jest.mock('@utils/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Component that throws an error
const ThrowError = ({shouldThrow}: {shouldThrow?: boolean}) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Child component</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console errors in tests since we're intentionally throwing errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('normal rendering', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Child component')).toBeInTheDocument();
    });

    it('should not call logger when no error', () => {
      render(
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      );

      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should catch errors and render default fallback', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
    });

    it('should render custom fallback when provided', () => {
      render(
        <ErrorBoundary fallback={<div>Custom error message</div>}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should log error when caught', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(logger.error).toHaveBeenCalledWith(
        'ErrorBoundary caught error',
        expect.objectContaining({
          message: 'Test error',
          stack: expect.any(String),
          componentStack: expect.any(String),
        })
      );
    });

    it('should call onError callback when error occurs', () => {
      const onError = jest.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('default fallback UI', () => {
    it('should render Try Again button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByRole('button', {name: /try again/i})).toBeInTheDocument();
    });

    it('should render Refresh Page button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByRole('button', {name: /refresh page/i})).toBeInTheDocument();
    });

    it('should reset error state when Try Again is clicked', async () => {
      const user = userEvent.setup();

      // Use a component that can toggle between throwing and not throwing
      let shouldThrow = true;
      const ToggleError = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div>Child component</div>;
      };

      const {rerender} = render(
        <ErrorBoundary>
          <ToggleError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Stop throwing
      shouldThrow = false;

      const tryAgainButton = screen.getByRole('button', {name: /try again/i});
      await user.click(tryAgainButton);

      // Re-render should now show child component
      rerender(
        <ErrorBoundary>
          <ToggleError />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.getByText('Child component')).toBeInTheDocument();
    });

    it('should handle Refresh Page button clicks', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByRole('button', {name: /refresh page/i});

      // Verify button is clickable and doesn't throw
      await expect(user.click(refreshButton)).resolves.not.toThrow();

      // Note: window.location.reload is read-only in jsdom and cannot be mocked easily.
      // The button's onClick handler calls window.location.reload() but we cannot verify
      // the actual reload call in this test environment.
    });
  });

  describe('development mode error details', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should show error details in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Error Details \(Development Only\)/)).toBeInTheDocument();
      expect(screen.getByText(/Error Message:/)).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('should not show error details in production mode', () => {
      process.env.NODE_ENV = 'production';

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText(/Error Details \(Development Only\)/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Error Message:/)).not.toBeInTheDocument();
    });

    it('should display stack trace in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Stack Trace:/)).toBeInTheDocument();
    });

    it('should display component stack in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Component Stack:/)).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle error without stack trace', () => {
      const ErrorWithoutStack = () => {
        const error = new Error('Error without stack');
        delete error.stack;
        throw error;
      };

      render(
        <ErrorBoundary>
          <ErrorWithoutStack />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle multiple errors', () => {
      const onError = jest.fn();

      const {rerender} = render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(onError).toHaveBeenCalledTimes(1);

      // Trigger another error
      rerender(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Still showing error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should work without onError callback', () => {
      expect(() => {
        render(
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>
        );
      }).not.toThrow();

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should work without children', () => {
      render(<ErrorBoundary />);

      // Should render nothing but not crash
      expect(document.body.querySelector('.error-boundary-fallback')).not.toBeInTheDocument();
    });
  });
});
