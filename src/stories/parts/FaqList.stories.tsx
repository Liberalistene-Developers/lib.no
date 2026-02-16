import preview from '../../../.storybook/preview'
import { FaqList } from '@common/FaqList/FaqList'

const meta = preview.meta({
  title: 'Parts/FaqList',
  component: FaqList,
  tags: ['autodocs']
})

const faqItems = [
  {
    itemID: 1,
    question: 'Hvor mange er liberalister 1',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 2,
    question: 'Hvor mange er liberalister 2',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 3,
    question: 'Hvor mange er liberalister 3',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 4,
    question: 'Hvor mange er liberalister 4',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 5,
    question: 'Hvor mange er liberalister 5',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  },
  {
    itemID: 6,
    question: 'Hvor mange er liberalister',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.'
  }
]

export const NotExpandable = meta.story({
  args: {
    items: faqItems,
    expandable: false,
    expanded: true
  }
})

export const ExpandableExpanded = meta.story({
  args: {
    ...NotExpandable.input.args,
    expandable: true
  }
})

export const ExpandableNotExpanded = meta.story({
  args: {
    ...NotExpandable.input.args,
    expandable: true,
    expanded: false
  }
})
