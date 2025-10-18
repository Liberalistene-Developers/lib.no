import {type FC} from 'react';

/**
 * Props for the Test component.
 */
interface TestProps {
  /** Custom message to display in the test component */
  message?: string;
}

/**
 * Test component for verifying React4xp v6 integration.
 *
 * A simple diagnostic component used to verify that:
 * - React4xp v6 is properly configured
 * - Component rendering works correctly
 * - Tailwind CSS is loading and applying styles
 *
 * Displays a blue-styled box with a title, custom message, and explanatory text.
 *
 * **This component is for development/testing purposes only.**
 *
 * @example
 * ```tsx
 * <Test message="Integration test successful!" />
 * ```
 *
 * @remarks
 * - Default message is "Hello from React4xp v6!"
 * - Should be removed or disabled in production
 * - Useful for troubleshooting React4xp setup issues
 */
export const Test: FC<TestProps> = ({
  message = 'Hello from React4xp v6!'
}) => (
  <div className="p-4 bg-blue-100 border-2 border-blue-500 rounded-lg">
    <h2 className="text-2xl font-bold text-blue-800 mb-2">Test Part</h2>
    <p className="text-blue-700">{message}</p>
    <p className="text-sm text-blue-600 mt-2">
      This is a simple test component to verify React4xp v6 is working.
    </p>
  </div>
);
