import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LBCandidate } from '@common/Candidate/LBCandidate';

const meta = {
  title: 'Parts/LBCandidate',
  component: LBCandidate,
  tags: ['autodocs']
} satisfies Meta<typeof LBCandidate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'ronny@liberalistene.no',
    name: 'Ronny Skjæveland',
    image: {
      url: 'https://picsum.photos/200/200'
    },
    phone: '99900666',
    position: '1. Kandidat Rogaland'
  }
};
