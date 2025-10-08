import * as React from 'react';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error) {
      if (console && console.error) {
        console.error(error.message);
      }
    }

    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ hasError: true, info, error });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong.</h1>
      );
    }

    return this.props.children;
  }
}
