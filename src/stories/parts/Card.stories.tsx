import preview from '../../../.storybook/preview'
import { Card } from '@common/Card/Card'

const meta = preview.meta({
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '496px', margin: '20px' }}>
        <Story />
      </div>
    )
  ]
})

export const Default = meta.story({
  args: {
    title: 'Card Title',
    text: '<p>This is a card with some content inside.</p>',
    url: '#'
  }
})

export const WithImage = meta.story({
  args: {
    title: 'Image Card',
    text: '<p>A card with an image at the top.</p>',
    image: {
      url: 'https://picsum.photos/400/300'
    },
    url: '#'
  }
})
