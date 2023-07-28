import React from 'react'

import { ImageBlock } from '../../main/resources/react4xp/libEntries/ImageBlock'

import { SingleLayout } from '../layouts'

import LocalImage from '../../../public/viken.jpeg'

export default {
  title: 'Parts/LocalParty',

  component: ImageBlock
}

const Template = (args) => (
  <SingleLayout>
    <ImageBlock {...args} />
  </SingleLayout>
)

export const NoHeader = Template.bind({})
NoHeader.args = {
  image: {
    url: LocalImage
  }
}

export const H3RightLight = Template.bind({})
H3RightLight.storyName = 'Locallag'
H3RightLight.args = {
  ...NoHeader.args,
  title: [
    { title: 'Liberalistene', titleColor: 'light' },
    { title: 'Viken', titleColor: 'yellow' }
  ],
  ingress: 'Et lokalt slagord her!',
  position: 'left',
  overlay: 'overlay purple',
  Tag: 'h1'
}
