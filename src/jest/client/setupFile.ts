/**
 * Jest setup file for client-side tests
 * This file is run once before all tests
 */

// Add custom jest-dom matchers
import '@testing-library/jest-dom';

// Suppress jsdom navigation errors
// jsdom doesn't fully implement navigation, which causes noise in test output
// when clicking on <a> tags. This is a known limitation and doesn't affect tests.
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const firstArg = args[0];

  // Check if it's the jsdom navigation error (string or Error object)
  const messageToCheck = firstArg instanceof Error ? firstArg.message : String(firstArg);

  if (messageToCheck.includes('Not implemented: navigation')) {
    return;
  }

  originalConsoleError(...args);
};
