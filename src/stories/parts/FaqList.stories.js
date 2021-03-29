import React from 'react';

import { FaqList } from '../../main/resources/react4xp/libEntries/FaqList';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Faq/List',
  component: FaqList,
};

const Template = (args) => (
  <SingleLayout>
    <FaqList {...args} />
  </SingleLayout>
);

export const NotExpandable = Template.bind({});
NotExpandable.args = {
  items: [
    {
      itemID: 1,
      question: 'Hvor mange er liberalister 1',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      itemID: 2,
      question: 'Hvor mange er liberalister 2',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      itemID: 3,
      question: 'Hvor mange er liberalister 3',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      itemID: 4,
      question: 'Hvor mange er liberalister 4',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      itemID: 5,
      question: 'Hvor mange er liberalister 5',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      itemID: 6,
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
  ],
  expandable: false,
  expanded: true,
};

export const ExpandableExpanded = Template.bind({});
ExpandableExpanded.args = {
  ...NotExpandable.args,
  expandable: true,
};

export const ExpandableNotExpanded = Template.bind({});
ExpandableNotExpanded.args = {
  ...NotExpandable.args,
  expandable: true,
  expanded: false,
};
