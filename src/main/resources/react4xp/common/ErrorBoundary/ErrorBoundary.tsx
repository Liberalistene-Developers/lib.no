import {Component, type ErrorInfo, type ReactNode} from 'react';
import {logger} from '@utils/logger';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /** Child components to wrap with error boundary */
  children?: ReactNode;
  /** Custom fallback UI to display when an error occurs. If not provided, uses default error UI */
  fallback?: ReactNode;
  /** Optional callback function called when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component that catches React component errors and provides graceful fallback UI
 *
 * Catches errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
 * Errors are logged using the logger utility and can be handled with a custom callback.
 *
 * **Features:**
 * - Prevents entire app from crashing due to component errors
 * - Provides default error UI with "Try Again" and "Refresh Page" buttons
 * - Shows detailed error information in development mode
 * - Logs errors with full stack traces
 * - Supports custom fallback UI
 * - Supports custom error handlers
 *
 * **Default Error UI includes:**
 * - User-friendly error message
 * - Try Again button (resets error state)
 * - Refresh Page button
 * - Error details in development mode (collapsible)
 *
 * @example
 * ```tsx
 * // Basic usage with default fallback
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * // With custom fallback UI
 * <ErrorBoundary fallback={<CustomErrorPage />}>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * // With error handler callback
 * <ErrorBoundary onError={(error, errorInfo) => {
 *   reportErrorToService(error, errorInfo);
 * }}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
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

  render(): ReactNode {
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
