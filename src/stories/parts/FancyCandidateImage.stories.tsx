import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FancyCandidateImage } from '../../main/resources/react4xp/components/parts/candidateblock/FancyCandidateImage';

const meta = {
  title: 'Parts/FancyCandidateImage',
  component: FancyCandidateImage,
  tags: ['autodocs']
} satisfies Meta<typeof FancyCandidateImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    artImage: {
      url: 'https://example.com/backdrop-art.svg'
    },
    image: {
      url: 'https://picsum.photos/400/600'
    },
    title: 'Ronny Skjæveland',
    subTitle: '1 kandidat, Rogaland'
  }
};
