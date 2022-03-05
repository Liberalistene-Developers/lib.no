import { StrictMode } from 'react';

export const decorators = [
  (Story) => (
    <StrictMode>
      <Story />
    </StrictMode>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
