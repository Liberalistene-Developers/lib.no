import React from 'react'

import { EventCard } from '../../main/resources/react4xp/shared/EventCard'

import { SingleLayout } from '../layouts'

import CardImage from '../../../public/cardimage.png'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Cards/EventCard',
  component: EventCard
}

const image = {
  url: CardImage
}

const Template = (args) => (
  <SingleLayout>
    <div data-portal-component-type="part" id="_20383168">
      <div className="events-list-wrapper">
        <div className="events-list gridlist">
          <EventCard {...args} />
          <EventCard {...args} />
          <EventCard {...args} />
          <EventCard {...args} />
        </div>
      </div>
    </div>
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  image,
  text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
  title: 'EventName',
  location: {
    address: 'Markensgate 39, Kristiansand'
  },
  date: '12:00'
}

export const Virtual = Template.bind({})
Virtual.args = {
  ...Normal.args,
  location: {
    address: 'https://www.facebook.com/events/759331661457410/',
    name: 'Facebook'
  },
  locationType: 'virtual'
}
