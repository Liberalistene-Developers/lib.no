import React from 'react'
import PropTypes from 'prop-types'

import { Event } from '../../main/resources/react4xp/libEntries/Event'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Event',
  component: Event
}

const image = {
  url: 'imageblockimage.png'
}

const Template = ({ fullWidth = true, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <Event {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...Event.propTypes,
  fullWidth: PropTypes.bool
}

export const Normal = Template.bind({})
Normal.args = {
  headerColor: 'light',
  headerPosition: 'right',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.',
  ingress:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus libero vel egesta. Supreat consectetur adipiscing elit.',
  image,
  ingressInImage: true,
  title: 'EventName',
  titleInImage: true,
  location: {
    address: 'Markensgate 39\nKristiansand'
  },
  time: '12:00',
  timeLabel: 'Kl:',
  date: undefined,
  dateLabel: undefined,
  email: 'post@liberalistene.no',
  informationLabel: 'Informasjon',
  locationLabel: 'Lokasjon',
  moreInformationLabel: 'Er det noe du lurer på?',
  contactLabel: 'Kontakt oss på'
}

export const Virtual = Template.bind({})
Virtual.args = {
  ...Normal.args,
  location: {
    url: 'https://www.facebook.com/events/759331661457410/',
    name: 'Facebook'
  },
  locationType: 'virtual'
}
