import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FourColumnWrapper } from './LayoutWrappers';

const meta = {
  title: 'Layouts/FourColumn',
  component: FourColumnWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FourColumnWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = (num: number) => (
  <div style={{ paddingTop: 20, paddingBottom: 20 }}>
    <h1>Column {num}</h1>
    <p className="rich-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
);

export const Standard_25_25_25_25: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one-25',
    middleLeftClassName: 'one-25',
    middleRightClassName: 'one-25',
    rightClassName: 'one-25'
  },
  render: (args) => (
    <FourColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
      {sampleContent(4)}
    </FourColumnWrapper>
  )
};

export const Purple_25_25_25_25: Story = {
  args: {
    background: 'purple',
    fullWidth: false,
    leftClassName: 'one-25',
    middleLeftClassName: 'one-25',
    middleRightClassName: 'one-25',
    rightClassName: 'one-25'
  },
  render: (args) => (
    <FourColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
      {sampleContent(4)}
    </FourColumnWrapper>
  )
};
