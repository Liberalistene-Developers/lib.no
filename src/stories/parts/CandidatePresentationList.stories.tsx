import preview from '../../../.storybook/preview'
import { CandidatePresentation } from '@common/CandidatePresentation/CandidatePresentation'

const meta = preview.meta({
  title: 'Parts/CandidatePresentation',
  component: CandidatePresentation,
  tags: ['autodocs']
})

const items = [
  {
    image: {
      url: 'https://picsum.photos/400/600?random=1'
    },
    name: 'Ronny Skjæveland',
    ingress:
      'Cras mattis tortor a nunc posuere sodales. Nam eu eros eu nisi elementum fringilla in in quam. Nam maximus gravida sagittis. Nulla viverra in odio porta elementum.',
    position: '1. Kandidat',
    place: 'Rogaland'
  },
  {
    image: {
      url: 'https://picsum.photos/400/600?random=2'
    },
    name: 'Jan Vindenes',
    position: '1. Kandidat',
    place: 'Vestland'
  },
  {
    image: {
      url: 'https://picsum.photos/400/600?random=3'
    },
    name: 'Per Sandberg',
    position: '1. Kandidat',
    place: 'Oslo'
  },
  {
    image: {
      url: 'https://picsum.photos/400/600?random=4'
    },
    name: 'Natalya E. Fritzen',
    position: '1. Kandidat',
    place: 'Akershus'
  }
]

export const Normal = meta.story({
  args: {
    items,
    preText: 'Bli kjent med'
  }
})
