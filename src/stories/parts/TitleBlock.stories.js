import React from 'react'

import TitleBlock from '../../main/resources/react4xp/libEntries/TitleBlock'

import { SingleLayout } from '../layouts'

import HeaderImage from '../../../public/header.png'

export default {
  title: 'Parts/TitleBlock',

  component: TitleBlock
}

const image = {
  url: HeaderImage
}

const Template = (args) => (
  <SingleLayout fullWidth background="purple">
    <TitleBlock {...args} />
  </SingleLayout>
)

export const SingleTitle = Template.bind({})
SingleTitle.args = {
  title: 'My Title',
  titleCenter: '',
  titleColor: '',
  image: undefined,
  imageClass: ''
}

export const SingleCenterTitle = Template.bind({})
SingleCenterTitle.args = {
  ...SingleTitle.args,
  titleCenter: 'center'
}

export const TitleImage = Template.bind({})
TitleImage.args = {
  ...SingleTitle.args,
  image
}
