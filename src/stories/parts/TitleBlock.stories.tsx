import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TitleBlock } from '@common/TitleBlock/TitleBlock';

const meta = {
  title: 'Parts/TitleBlock',
  component: TitleBlock,
  tags: ['autodocs']
} satisfies Meta<typeof TitleBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleTitle: Story = {
  args: {
    title: 'My Title',
    titleCenter: '',
    titleColor: '',
    image: undefined,
    imageClass: ''
  }
};

export const SingleCenterTitle: Story = {
  args: {
    ...SingleTitle.args,
    titleCenter: 'center'
  }
};

export const TitleImage: Story = {
  args: {
    ...SingleTitle.args,
    image: {
      url: 'https://picsum.photos/1200/400'
    }
  }
};
