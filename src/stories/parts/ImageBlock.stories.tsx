import preview from '../../../.storybook/preview'
import { ImageBlock } from '@common/ImageBlock/ImageBlock'

const meta = preview.meta({
  title: 'Parts/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    overlay: {
      control: 'select',
      options: ['', 'purple', 'dark']
    }
  }
})

export const CenterWithTitle = meta.story({
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [{ title: 'Frihet for fremtiden', titleColor: 'purple' }],
    position: 'center',
    overlay: 'purple'
  }
})

export const LeftWithIngress = meta.story({
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [{ title: 'Våre verdier', titleColor: 'yellow' }],
    ingress: '<p>Vi kjemper for individuell frihet og ansvar</p>',
    position: 'left',
    overlay: 'purple'
  }
})

export const RightNoOverlay = meta.story({
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [{ title: 'Bli med oss', titleColor: 'light' }],
    position: 'right'
  }
})
