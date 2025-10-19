import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TwoColumn2RowWrapper } from './LayoutWrappers';

const meta = {
  title: 'Layouts/TwoColumn2row',
  component: TwoColumn2RowWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof TwoColumn2RowWrapper>;

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

export const Standard_20_80: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one-20',
    rightClassName: 'four',
    order: ''
  },
  render: (args) => (
    <TwoColumn2RowWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </TwoColumn2RowWrapper>
  )
};

export const Purple_20_80: Story = {
  args: {
    background: 'purple',
    fullWidth: false,
    leftClassName: 'one-20',
    rightClassName: 'four',
    order: ''
  },
  render: (args) => (
    <TwoColumn2RowWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </TwoColumn2RowWrapper>
  )
};

export const Standard_20_80_Reversed: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one-20',
    rightClassName: 'four',
    order: 'reverse'
  },
  render: (args) => (
    <TwoColumn2RowWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
      {sampleContent(3)}
    </TwoColumn2RowWrapper>
  )
};
