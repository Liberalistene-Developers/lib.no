import addonDocs from "@storybook/addon-docs";
import { definePreview } from '@storybook/react-webpack5'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import '../src/assets/tailwind.css'

export default definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff'
        },

        dark: {
          name: 'dark',
          value: '#333333'
        }
      }
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
    },

    backgrounds: {
      value: 'light'
    }
  },

  tags: ['autodocs'],
  addons: [addonDocs()]
})
