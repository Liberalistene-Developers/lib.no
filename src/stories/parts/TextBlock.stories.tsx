import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TextBlock } from '../../main/resources/react4xp/components/parts/textblock/TextBlock';

const meta = {
  title: 'Parts/TextBlock',
  component: TextBlock,
  tags: ['autodocs']
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '<h2>This is a heading</h2><p>This is some text content in the text block. It supports HTML formatting.</p>',
    centered: false
  }
};

export const Centered: Story = {
  args: {
    text: '<h2>Centered Content</h2><p>This text block is centered on the page.</p>',
    centered: true
  }
};

export const WithTitle: Story = {
  args: {
    title: 'Text Block Title',
    text: '<p>This text block has a title above it.</p>',
    centered: false
  }
};
