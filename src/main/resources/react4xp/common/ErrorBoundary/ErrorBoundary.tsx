import * as React from 'react';
import {logger} from '@utils/logger';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * Error Boundary component that catches React component errors and provides graceful fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorPage />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error with full context
    logger.error('ErrorBoundary caught error', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    // Update state with error details
    this.setState({
      hasError: true,
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      const isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

      return (
        <div className="error-boundary-fallback p-8 bg-red-50 border border-red-200 rounded-lg">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              Something went wrong
            </h1>

            <p className="text-red-700 mb-4">
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            <div className="flex gap-4 mb-6">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Refresh Page
              </button>
            </div>

            {isDevelopment && this.state.error && (
              <details className="mt-6 p-4 bg-white border border-red-300 rounded">
                <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                  Error Details (Development Only)
                </summary>

                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-700 mb-1">Error Message:</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {this.state.error.message}
                    </pre>
                  </div>

                  {this.state.error.stack && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-700 mb-1">Stack Trace:</h3>
                      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-64">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}

                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-700 mb-1">Component Stack:</h3>
                      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-64">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
