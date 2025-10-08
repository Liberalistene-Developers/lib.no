import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Image } from '@common/Image';

const meta = {
  title: 'Shared/Image',
  component: Image,
  tags: ['autodocs']
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = {
  url: 'https://picsum.photos/400/400'
};

export const Small: Story = {
  args: {
    className: 'small',
    image: sampleImage,
    imageClassName: ''
  }
};

export const Medium: Story = {
  args: {
    className: 'medium',
    image: sampleImage,
    imageClassName: ''
  }
};

export const Large: Story = {
  args: {
    className: 'large',
    image: sampleImage,
    imageClassName: ''
  }
};

export const RoundSmall: Story = {
  args: {
    className: 'small',
    image: sampleImage,
    imageClassName: 'round'
  }
};

export const RoundMedium: Story = {
  args: {
    className: 'medium',
    image: sampleImage,
    imageClassName: 'round'
  }
};

export const RoundLarge: Story = {
  args: {
    className: 'large',
    image: sampleImage,
    imageClassName: 'round'
  }
};
