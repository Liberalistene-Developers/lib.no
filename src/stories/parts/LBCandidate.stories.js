import React from 'react'

import { LBCandidate } from '../../main/resources/react4xp/libEntries/LBCandidate'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/LocalBranchCandidate',
  component: LBCandidate
}

const Template = ({ ...args }) => (
  <SingleLayout background="light-grey">
    <LBCandidate {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...LBCandidate.propTypes
}

export const LocalBranchCandidate = Template.bind({})
LocalBranchCandidate.args = {
  email: 'ronny@liberalistene.no',
  name: 'Ronny Skjæveland',
  image: {
    url: 'partyleader.jpg'
  },
  phone: '99900666',
  position: '1. Kandidat Rogaland'
}
