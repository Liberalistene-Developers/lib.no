import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThreeColumnWrapper } from './LayoutWrappers';

const meta = {
  title: 'Layouts/ThreeColumn',
  component: ThreeColumnWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof ThreeColumnWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = (num: number) => (
  <div style={{ paddingTop: 20, paddingBottom: 20 }}>
    <h1>Lorem ipsum {num}</h1>
    <p className="rich-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis
      posuere, eu convallis lorem tempor.
    </p>
  </div>
);

export const Standard_33_33_33: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one-33',
    middleClassName: 'one-33',
    rightClassName: 'one-33'
  },
  render: (args) => (
    <ThreeColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </ThreeColumnWrapper>
  )
};

export const Purple_33_33_33: Story = {
  args: {
    background: 'purple',
    fullWidth: false,
    leftClassName: 'one-33',
    middleClassName: 'one-33',
    rightClassName: 'one-33'
  },
  render: (args) => (
    <ThreeColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </ThreeColumnWrapper>
  )
};

export const Standard_25_50_25: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one-25',
    middleClassName: 'one',
    rightClassName: 'one-25'
  },
  render: (args) => (
    <ThreeColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </ThreeColumnWrapper>
  )
};
