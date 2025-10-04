import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FaqItem } from '../../main/resources/react4xp/components/parts/faq/FaqItem';

const meta = {
  title: 'Parts/Faq',
  component: FaqItem,
  tags: ['autodocs']
} satisfies Meta<typeof FaqItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotExpandable: Story = {
  args: {
    question: 'Hvor mange er liberalister',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    expandable: false,
    expanded: true
  }
};

export const ExpandableExpanded: Story = {
  args: {
    ...NotExpandable.args,
    expandable: true
  }
};

export const ExpandableNotExpanded: Story = {
  args: {
    ...NotExpandable.args,
    expandable: true,
    expanded: false
  }
};
