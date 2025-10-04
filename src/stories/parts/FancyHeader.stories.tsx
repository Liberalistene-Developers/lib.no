import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FancyHeader } from '../../main/resources/react4xp/components/parts/fancyheader/FancyHeader';

const meta = {
  title: 'Parts/FancyHeader',
  component: FancyHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FancyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    title: 'Organisasjon',
    image: {
      url: 'https://picsum.photos/1200/600'
    },
    effect: {
      url: '/effect.svg'
    }
  }
};
