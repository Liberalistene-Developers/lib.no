import preview from '../../../.storybook/preview'
import { FancyHeader } from '@common/FancyHeader/FancyHeader'

const meta = preview.meta({
  title: 'Parts/FancyHeader',
  component: FancyHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
})

export const Normal = meta.story({
  args: {
    title: 'Organisasjon',
    image: {
      url: 'https://picsum.photos/1200/600'
    },
    effect: {
      url: '/effect.svg'
    }
  }
})
