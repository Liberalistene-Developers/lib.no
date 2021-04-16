import React from 'react'

import { Page } from './Page'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Pages/Default',
  component: Page
}

const Template = (args) => (
  <Page {...args} />
)

export const Default = Template.bind({})
Default.args = {
}
