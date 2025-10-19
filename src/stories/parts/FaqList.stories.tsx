import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FaqList } from '@common/FaqList/FaqList';

const meta = {
  title: 'Parts/FaqList',
  component: FaqList,
  tags: ['autodocs']
} satisfies Meta<typeof FaqList>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    itemID: 1,
    question: 'Hvor mange er liberalister 1',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 2,
    question: 'Hvor mange er liberalister 2',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 3,
    question: 'Hvor mange er liberalister 3',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 4,
    question: 'Hvor mange er liberalister 4',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 5,
    question: 'Hvor mange er liberalister 5',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 6,
    question: 'Hvor mange er liberalister',
    answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  }
];

export const NotExpandable: Story = {
  args: {
    items: faqItems,
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
