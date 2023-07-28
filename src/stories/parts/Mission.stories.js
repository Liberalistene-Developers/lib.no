import React from 'react'

import { Mission } from '../../main/resources/react4xp/libEntries/Mission'

import { SingleLayout } from '../layouts'

import MissionImage from '../../../public/meditation.png'

export default {
  title: 'Parts/Mission',

  component: Mission
}

const Template = (args) => (
  <SingleLayout>
    <Mission {...args} />
  </SingleLayout>
)

export const MissionSample = Template.bind({})
MissionSample.args = {
  description:
    'Liberalistene vil sikre større frihet for enkeltindividet ved å forby all innledning av fysisk tvang.',
  image: {
    url: MissionImage
  },
  title: 'Individuell frihet'
}
