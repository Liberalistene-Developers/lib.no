import * as React from 'react';
import {logger} from '/react4xp/utils/logger';

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
      logger.error('ErrorBoundary caught error', error);
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
