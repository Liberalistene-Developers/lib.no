import preview from '../../../.storybook/preview'
import { CandidatePresentationItem } from '@common/CandidatePresentationItem/CandidatePresentationItem'

const meta = preview.meta({
  title: 'Shared/CandidatePresentationItem',
  component: CandidatePresentationItem,
  tags: ['autodocs']
})

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
}

export const Normal = meta.story({
  args: defaultCandidate
})

export const Main = meta.story({
  args: {
    ...defaultCandidate,
    className: 'main'
  }
})
