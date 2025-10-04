import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../main/resources/react4xp/components/parts/button/Button';

const meta = {
  title: 'Parts/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes (use "light" for light variant)'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    title: 'Bli medlem',
    url: 'https://liberalistene.org',
    className: 'light'
  }
};

export const Dark: Story = {
  args: {
    title: 'Les mer',
    url: 'https://liberalistene.org',
    className: 'dark'
  }
};

export const WithoutURL: Story = {
  args: {
    title: 'Click me',
    className: 'light'
  }
};
