import React from 'react'

import { FancyCandidateImage } from '../../main/resources/react4xp/libEntries/FancyCandidateImage'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/FancyCandidateImage',
  component: FancyCandidateImage
}

const Template = (args) => (
  <SingleLayout>
    <FancyCandidateImage {...args} />
  </SingleLayout>
)

const image = {
  url: 'candidate-image.jpg'
}

const artImage = {
  url: 'backdrop-art.svg'
}

export const Normal = Template.bind({})
Normal.args = {
  artImage,
  image,
  title: 'Ronny Skjæveland',
  subTitle: '1 kandidat, Rogaland'
}
