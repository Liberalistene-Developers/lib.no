import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      galaxyS10e: {
        name: 'Galaxy S10e',
        styles: {
          width: '360px',
          height: '760px'
        }
      },
      defaultViewport: 'galaxys10e'
    }
  }
}
