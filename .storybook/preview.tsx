import type { Preview } from '@storybook/react-webpack5';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/assets/tailwind.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#333333'
        }
      ]
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        galaxyS10e: {
          name: 'Galaxy S10e',
          styles: {
            width: '360px',
            height: '760px'
          }
        },
        mobile: {
          name: 'Mobile (414px)',
          styles: {
            width: '414px',
            height: '896px'
          }
        }
      }
    }
  },

  initialGlobals: {
    viewport: {
      value: 'responsive',
      isRotated: false
    }
  },

  tags: ['autodocs']
};

export default preview;
