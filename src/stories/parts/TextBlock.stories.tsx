import preview from '../../../.storybook/preview'
import { TextBlock } from '@common/TextBlock/TextBlock'

const meta = preview.meta({
  title: 'Parts/TextBlock',
  component: TextBlock,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    text: '<h2>This is a heading</h2><p>This is some text content in the text block. It supports HTML formatting.</p>',
    centered: false
  }
})

export const Centered = meta.story({
  args: {
    text: '<h2>Centered Content</h2><p>This text block is centered on the page.</p>',
    centered: true
  }
})

export const WithTitle = meta.story({
  args: {
    title: 'Text Block Title',
    text: '<p>This text block has a title above it.</p>',
    centered: false
  }
})
