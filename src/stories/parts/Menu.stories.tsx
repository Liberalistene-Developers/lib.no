import preview from '../../../.storybook/preview'
import { Menu } from '@common/Menu/Menu'

const meta = preview.meta({
  title: 'Parts/Menu',
  component: Menu,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    items: [
      {
        title: 'Menu'
      },
      {
        title: 'Menu'
      },
      {
        title: 'Menu'
      },
      {
        title: 'Menu'
      }
    ]
  }
})
