import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ImageBlock } from '@parts/imageblock/ImageBlock';

const meta = {
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
} satisfies Meta<typeof ImageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CenterWithTitle: Story = {
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [
      { title: 'Frihet for fremtiden', titleColor: 'purple' }
    ],
    position: 'center',
    overlay: 'purple'
  }
};

export const LeftWithIngress: Story = {
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [
      { title: 'Våre verdier', titleColor: 'yellow' }
    ],
    ingress: '<p>Vi kjemper for individuell frihet og ansvar</p>',
    position: 'left',
    overlay: 'purple'
  }
};

export const RightNoOverlay: Story = {
  args: {
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: [
      { title: 'Bli med oss', titleColor: 'light' }
    ],
    position: 'right'
  }
};
