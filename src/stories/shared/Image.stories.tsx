import preview from '../../../.storybook/preview'
import { Image } from '@common/Image/Image'

const meta = preview.meta({
  title: 'Shared/Image',
  component: Image,
  tags: ['autodocs']
})

const sampleImage = {
  url: 'https://picsum.photos/400/400'
}

export const Small = meta.story({
  args: {
    className: 'small',
    image: sampleImage,
    imageClassName: ''
  }
})

export const Medium = meta.story({
  args: {
    className: 'medium',
    image: sampleImage,
    imageClassName: ''
  }
})

export const Large = meta.story({
  args: {
    className: 'large',
    image: sampleImage,
    imageClassName: ''
  }
})

export const RoundSmall = meta.story({
  args: {
    className: 'small',
    image: sampleImage,
    imageClassName: 'round'
  }
})

export const RoundMedium = meta.story({
  args: {
    className: 'medium',
    image: sampleImage,
    imageClassName: 'round'
  }
})

export const RoundLarge = meta.story({
  args: {
    className: 'large',
    image: sampleImage,
    imageClassName: 'round'
  }
})
