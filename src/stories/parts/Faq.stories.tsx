import preview from '../../../.storybook/preview'
import { Faq } from '@common/Faq/Faq'

const meta = preview.meta({
  title: 'Parts/Faq',
  component: Faq,
  tags: ['autodocs']
})

export const NotExpandable = meta.story({
  args: {
    question: 'Hvor mange er liberalister',
    answer:
      'Alle er født liberalister, men de fleste blir hjernevasket til å bli semi-sosialister.',
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
