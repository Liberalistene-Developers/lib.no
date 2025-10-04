import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CandidatePresentationItem } from '../../main/resources/react4xp/components/shared/CandidatePresentationItem';

const meta = {
  title: 'Shared/CandidatePresentationItem',
  component: CandidatePresentationItem,
  tags: ['autodocs']
} satisfies Meta<typeof CandidatePresentationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCandidate = {
  image: {
    url: 'https://picsum.photos/400/600?random=1'
  },
  name: 'Ronny Skjæveland',
  ingress:
    'Cras mattis tortor a nunc posuere sodales. Nam eu eros eu nisi elementum fringilla in in quam. Nam maximus gravida sagittis. Nulla viverra in odio porta elementum.',
  position: '1. Kandidat',
  place: 'Rogaland',
  preText: 'Bli kjent med'
};

export const Normal: Story = {
  args: defaultCandidate
};

export const Main: Story = {
  args: {
    ...defaultCandidate,
    className: 'main'
  }
};
