import preview from '../../../.storybook/preview'
import { CandidateBlock } from '@common/CandidateBlock/CandidateBlock'

const meta = preview.meta({
  title: 'Parts/CandidateBlock',
  component: CandidateBlock,
  tags: ['autodocs']
})

const candidate = {
  email: 'ronny@liberalistene.no',
  name: 'Ronny Skjæveland',
  image: {
    url: 'https://picsum.photos/200/200'
  },
  phone: '99900666'
}

const positions = ['1.', '2.', '3.', '4.'].map(
  (nr) => `${nr} kandidat Rogaland`
)
const items = positions.map((position) => ({ ...candidate, position }))

export const Default = meta.story({
  args: {
    title: 'Våre folk',
    items
  }
})

export const OddNumber = meta.story({
  args: {
    title: 'Våre folk',
    items: items.slice(0, 3)
  }
})
