
import { CandidatePresentationList } from '../../main/resources/react4xp/libEntries/CandidatePresentationList'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/CandidatePresentation/List',
  component: CandidatePresentationList
}

const items = [
  {
    image: {
      url: 'kandidat1.jpg'
    },
    name: 'Ronny Skjæveland',
    ingress: 'Cras mattis tortor a nunc posuere sodales. Nam eu eros eu nisi elementum fringilla in in quam. Nam maximus gravida sagittis. Nulla viverra in odio porta elementum.',
    position: '1. Kandidat',
    place: 'Rogaland'
  },
  {
    image: {
      url: 'kandidat2.jpg'
    },
    name: 'Jan Vindenes',
    position: '1. Kandidat',
    place: 'Vestland'
  },
  {
    image: {
      url: 'kandidat3.jpg'
    },
    name: 'Per Sandberg',
    position: '1. Kandidat',
    place: 'Oslo'
  },
  {
    image: {
      url: 'kandidat4.jpg'
    },
    name: 'Natalya E. Fritzen',
    position: '1. Kandidat',
    place: 'Akershus'
  }
]

const preText = 'Bli kjent med'

const Template = (args) => (
  <SingleLayout>
    <CandidatePresentationList {...args} />
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  items,
  preText
}
