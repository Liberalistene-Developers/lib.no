import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { TwoColumnWrapper } from './LayoutWrappers'

const meta = {
  title: 'Layouts/TwoColumn',
  component: TwoColumnWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof TwoColumnWrapper>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = (num: number) => (
  <div
    key={num}
    style={{
      padding: '20px',
      border: '2px solid #333',
      minHeight: '150px',
      backgroundColor: 'transparent'
    }}
  >
    <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>
      Column {num}
    </h1>
    <p style={{ color: '#666', lineHeight: '1.6' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper
      lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius
      dictum.
    </p>
  </div>
)

export const Standard_50_50: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'one',
    rightClassName: 'one'
  },
  render: (args) => (
    <TwoColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
    </TwoColumnWrapper>
  )
}

export const Purple_50_50: Story = {
  args: {
    background: 'purple',
    fullWidth: false,
    leftClassName: 'one',
    rightClassName: 'one'
  },
  parameters: {
    backgrounds: { disable: true }
  },
  render: (args) => (
    <TwoColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
    </TwoColumnWrapper>
  )
}

export const Standard_30_70: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'three-10',
    rightClassName: 'seven-10'
  },
  render: (args) => (
    <TwoColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
    </TwoColumnWrapper>
  )
}

export const Standard_70_30: Story = {
  args: {
    background: 'standard',
    fullWidth: false,
    leftClassName: 'seven-10',
    rightClassName: 'three-10'
  },
  render: (args) => (
    <TwoColumnWrapper {...args}>
      {sampleContent(1)}
      {sampleContent(2)}
    </TwoColumnWrapper>
  )
}
