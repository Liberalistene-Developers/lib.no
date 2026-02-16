import preview from '../../../.storybook/preview'
import { LBCandidate } from '@common/Candidate/LBCandidate'

const meta = preview.meta({
  title: 'Parts/LBCandidate',
  component: LBCandidate,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    email: 'ronny@liberalistene.no',
    name: 'Ronny Skjæveland',
    image: {
      url: 'https://picsum.photos/200/200'
    },
    phone: '99900666',
    position: '1. Kandidat Rogaland'
  }
})
