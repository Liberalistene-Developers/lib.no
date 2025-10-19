import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';

/**
 * Test processor for React4xp v6 integration verification.
 *
 * This is a minimal processor used for testing and verifying that the React4xp v6
 * architecture is working correctly. It requires no configuration or content data
 * and simply returns a static message.
 *
 * Used for development, testing, and troubleshooting React4xp integration issues.
 *
 * **Data Flow:**
 * 1. Returns static test message with no data processing
 *
 * @returns Test props with a greeting message
 *
 * @example
 * ```ts
 * // Returns:
 * {
 *   message: 'Hello from React4xp v6!'
 * }
 * ```
 *
 * @remarks
 * - No component configuration or content data required
 * - Used primarily for development and integration testing
 * - Should not be used in production content
 */
export const testProcessor: ComponentProcessor<'lib.no:test'> = () => {
  return {
    message: 'Hello from React4xp v6!'
  };
};
