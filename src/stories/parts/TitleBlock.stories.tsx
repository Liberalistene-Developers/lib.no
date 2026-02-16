import preview from '../../../.storybook/preview'
import { TitleBlock } from '@common/TitleBlock/TitleBlock'

const meta = preview.meta({
  title: 'Parts/TitleBlock',
  component: TitleBlock,
  tags: ['autodocs']
})

export const SingleTitle = meta.story({
  args: {
    title: 'My Title',
    titleCenter: '',
    titleColor: '',
    image: undefined,
    imageClass: ''
  }
})

export const SingleCenterTitle = meta.story({
  args: {
    ...SingleTitle.input.args,
    titleCenter: 'center'
  }
})

export const TitleImage = meta.story({
  args: {
    ...SingleTitle.input.args,
    image: {
      url: 'https://picsum.photos/1200/400'
    }
  }
})
