import * as React from 'react';

interface TestProps {
  message?: string;
}

export const Test: React.FC<TestProps> = ({
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
