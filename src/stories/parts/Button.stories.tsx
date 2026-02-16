import preview from '../../../.storybook/preview'
import { Button } from '@common/Button/Button'

const meta = preview.meta({
  title: 'Parts/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes (use "light" for light variant)'
    }
  }
})

export const Light = meta.story({
  args: {
    title: 'Bli medlem',
    url: 'https://liberalistene.org',
    className: 'light'
  }
})

export const Dark = meta.story({
  args: {
    title: 'Les mer',
    url: 'https://liberalistene.org',
    className: 'dark'
  }
})

export const WithoutURL = meta.story({
  args: {
    title: 'Click me',
    className: 'light'
  }
})
