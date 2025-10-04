import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card } from '../../main/resources/react4xp/components/shared/Card';

const meta = {
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    text: '<p>This is a card with some content inside.</p>',
    url: '#'
  }
};

export const WithImage: Story = {
  args: {
    title: 'Image Card',
    text: '<p>A card with an image at the top.</p>',
    image: {
      url: 'https://picsum.photos/400/300'
    },
    url: '#'
  }
};
