import React from 'react'

import { LBCandidateBlock } from '../../main/resources/react4xp/libEntries/LBCandidateBlock'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/LocalBranchCandidatesBlock',
  component: LBCandidateBlock
}

const candidate = {
  email: 'ronny@liberalistene.no',
  name: 'Ronny Skjæveland',
  image: {
    url: 'partyleader.jpg'
  },
  phone: '99900666'
}

const positions = ['1.', '2.', '3.', '4.'].map(
  (nr) => `${nr} kandidat Rogaland`
)

const items = positions.map((position) => ({ ...candidate, position }))

const Template = ({ ...args }) => (
  <SingleLayout background="light-grey">
    <LBCandidateBlock {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...LBCandidateBlock.propTypes
}

export const LocalBranchCandidatesBlock = Template.bind({})
LocalBranchCandidatesBlock.args = {
  title: 'Våre folk',
  items
}

export const LocalBranchCandidatesBlockOdd = Template.bind({})
LocalBranchCandidatesBlockOdd.args = {
  ...LocalBranchCandidatesBlock.args,
  items: items.slice(0, 3)
}
