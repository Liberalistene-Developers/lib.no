/**
 * Centralized logging service for the application.
 *
 * Provides structured logging with different log levels and environment-based behavior.
 * In production, only errors and warnings are logged. In development, all levels are available.
 *
 * @example
 * ```tsx
 * import {logger} from '/react4xp/utils/logger';
 *
 * logger.debug('Component rendered', {componentName: 'Article'});
 * logger.info('User action', {action: 'click', target: 'button'});
 * logger.warn('Deprecated feature used', {feature: 'oldApi'});
 * logger.error('Failed to fetch data', error);
 * ```
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, errorOrContext?: Error | LogContext) => void;
}

/**
 * Determines if logging should be enabled based on environment.
 * In production, only errors and warnings are logged.
 */
const isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Formats a log message with timestamp and level.
 */
function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Safely stringifies context object for logging.
 */
function stringifyContext(context: unknown): string {
  try {
    return JSON.stringify(context, null, 2);
  } catch {
    return String(context);
  }
}

/**
 * Centralized logger instance.
 *
 * Use this instead of console.log/console.error throughout the application.
 */
export const logger: Logger = {
  /**
   * Debug-level logging. Only outputs in development.
   * Use for detailed debugging information.
   */
  debug: (message: string, context?: LogContext): void => {
    if (isDevelopment) {
      console.debug(formatMessage('debug', message), context ? stringifyContext(context) : '');
    }
  },

  /**
   * Info-level logging. Only outputs in development.
   * Use for general informational messages.
   */
  info: (message: string, context?: LogContext): void => {
    if (isDevelopment) {
      console.info(formatMessage('info', message), context ? stringifyContext(context) : '');
    }
  },

  /**
   * Warning-level logging. Outputs in all environments.
   * Use for potentially problematic situations.
   */
  warn: (message: string, context?: LogContext): void => {
    console.warn(formatMessage('warn', message), context ? stringifyContext(context) : '');
  },

  /**
   * Error-level logging. Outputs in all environments.
   * Use for error conditions that need attention.
   */
  error: (message: string, errorOrContext?: Error | LogContext): void => {
    if (errorOrContext instanceof Error) {
      console.error(formatMessage('error', message), errorOrContext);
    } else {
      console.error(formatMessage('error', message), errorOrContext ? stringifyContext(errorOrContext) : '');
    }
  },
};
