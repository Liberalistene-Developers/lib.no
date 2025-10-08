import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu } from '@parts/submenu/Menu';

const meta = {
  title: 'Parts/Menu',
  component: Menu,
  tags: ['autodocs']
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
};
