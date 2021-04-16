import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from '../../main/resources/react4xp/libEntries/Menu.jsx'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/Menu/Menu',

  component: Menu
}

const Template = ({ fullWidth = false, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <Menu {...args} />
  </SingleLayout>
)

Template.propTypes = {
  fullWidth: PropTypes.bool
}

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      title: 'Menu'
    },
    {
      title: 'Menu'
    },
    {
      title: 'Menu'
    },
    {
      title: 'Menu'
    }
  ]
}
