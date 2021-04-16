import React from 'react'
import PropTypes from 'prop-types'

import { FancyHeader } from '../../main/resources/react4xp/libEntries/FancyHeader'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/FancyHeader',
  component: FancyHeader
}

const Template = ({ fullWidth, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <FancyHeader {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...FancyHeader.propTypes,
  fullWidth: PropTypes.bool
}

Template.defaultProps = {
  fullWidth: false
}

const effect = {
  url: 'effect.svg'
}

const image = {
  url: 'organisasjon.jpg'
}

export const Normal = Template.bind({})
Normal.args = {
  title: 'Organisasjon',
  image,
  effect,
  fullWidth: true
}
