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
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
      question: 'Hvor mange er liberalister',
      answer: 'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
    },
    {
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
