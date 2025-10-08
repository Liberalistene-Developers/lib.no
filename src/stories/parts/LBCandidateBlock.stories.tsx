import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LBCandidateBlock } from '@parts/candidateblock/LBCandidateBlock';

const meta = {
  title: 'Parts/LBCandidateBlock',
  component: LBCandidateBlock,
  tags: ['autodocs']
} satisfies Meta<typeof LBCandidateBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const candidate = {
  email: 'ronny@liberalistene.no',
  name: 'Ronny Skjæveland',
  image: {
    url: 'https://picsum.photos/200/200'
  },
  phone: '99900666'
};

const positions = ['1.', '2.', '3.', '4.'].map((nr) => `${nr} kandidat Rogaland`);
const items = positions.map((position) => ({ ...candidate, position }));

export const Default: Story = {
  args: {
    title: 'Våre folk',
    items
  }
};

export const OddNumber: Story = {
  args: {
    title: 'Våre folk',
    items: items.slice(0, 3)
  }
};
