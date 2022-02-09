
import { CandidatePresentationItem } from '../../main/resources/react4xp/shared/CandidatePresentationItem'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/CandidatePresentation/Item',
  component: CandidatePresentationItem
}

const image = {
  url: 'kandidat1.jpg'
}

const defaultCandidate = {
  image,
  name: 'Ronny Skjæveland',
  ingress: 'Cras mattis tortor a nunc posuere sodales. Nam eu eros eu nisi elementum fringilla in in quam. Nam maximus gravida sagittis. Nulla viverra in odio porta elementum.',
  position: '1. Kandidat',
  place: 'Rogaland',
  preText: 'Bli kjent med'
}

const Template = (args) => (
  <SingleLayout>
    <div className="candidate-presentation list">
      <CandidatePresentationItem {...args} />
    </div>
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  ...defaultCandidate
}

export const Main = Template.bind({})
Main.args = {
  ...defaultCandidate,
  className: 'main'
}
