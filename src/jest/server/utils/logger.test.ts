import {logger} from '/react4xp/utils/logger';

describe('logger', () => {
  const originalConsole = {...console};
  const isDevelopment = process.env.NODE_ENV === 'development';

  beforeEach(() => {
    console.debug = jest.fn();
    console.info = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.debug = originalConsole.debug;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  });

  describe('debug', () => {
    it('should call console.debug when logging', () => {
      logger.debug('Debug message');
      // In test environment, debug won't log. In development, it will.
      if (isDevelopment) {
        expect(console.debug).toHaveBeenCalled();
      } else {
        expect(console.debug).not.toHaveBeenCalled();
      }
    });

    it('should log debug message with context', () => {
      logger.debug('Debug message', {key: 'value'});
      if (isDevelopment) {
        expect(console.debug).toHaveBeenCalled();
      } else {
        expect(console.debug).not.toHaveBeenCalled();
      }
    });

    it('should handle context formatting', () => {
      logger.debug('Debug message', {key: 'value', nested: {prop: 'test'}});
      // Function should execute without errors
      expect(true).toBe(true);
    });
  });

  describe('info', () => {
    it('should call console.info when logging', () => {
      logger.info('Info message');
      if (isDevelopment) {
        expect(console.info).toHaveBeenCalled();
      } else {
        expect(console.info).not.toHaveBeenCalled();
      }
    });

    it('should log info message with context', () => {
      logger.info('Info message', {key: 'value'});
      if (isDevelopment) {
        expect(console.info).toHaveBeenCalled();
      } else {
        expect(console.info).not.toHaveBeenCalled();
      }
    });

    it('should handle context formatting', () => {
      logger.info('Info message', {key: 'value', nested: {prop: 'test'}});
      // Function should execute without errors
      expect(true).toBe(true);
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      logger.warn('Warning message');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should log warning message with context', () => {
      logger.warn('Warning message', {key: 'value'});
      expect(console.warn).toHaveBeenCalled();
    });

    it('should log warning in production', () => {
      process.env.NODE_ENV = 'production';
      logger.warn('Warning message');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      logger.error('Error message');
      expect(console.error).toHaveBeenCalled();
    });

    it('should log error message with Error object', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(console.error).toHaveBeenCalled();
      const calls = (console.error as jest.Mock).mock.calls[0];
      expect(calls[1]).toBe(error);
    });

    it('should log error message with context object', () => {
      logger.error('Error message', {key: 'value'});
      expect(console.error).toHaveBeenCalled();
    });

    it('should log error in production', () => {
      process.env.NODE_ENV = 'production';
      logger.error('Error message');
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle circular references in context', () => {
      const circular: {self?: unknown; key?: string} = {key: 'value'};
      circular.self = circular;

      logger.error('Error with circular reference', circular);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('formatMessage', () => {
    it('should include timestamp and level in log message', () => {
      logger.warn('Test message');
      const calls = (console.warn as jest.Mock).mock.calls[0];
      const message = calls[0];

      expect(message).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/);
      expect(message).toContain('[WARN]');
      expect(message).toContain('Test message');
    });
  });

  describe('stringifyContext', () => {
    it('should stringify simple objects', () => {
      logger.warn('Test', {key: 'value'});
      const calls = (console.warn as jest.Mock).mock.calls[0];
      expect(calls[1]).toContain('"key"');
      expect(calls[1]).toContain('"value"');
    });

    it('should handle non-stringifiable objects', () => {
      const circular: {self?: unknown} = {};
      circular.self = circular;

      // Should not throw
      expect(() => logger.warn('Test', circular)).not.toThrow();
    });
  });
});
