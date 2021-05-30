import React from 'react'

import { Map } from '../../main/resources/react4xp/shared/Map'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/Map',

  component: Map
}

const Template = (args) => (
  <SingleLayout>
    <div className="event">
      <div className="location">
        <Map {...args} />
      </div>
    </div>
  </SingleLayout>
)

export const Default = Template.bind({})
Default.args = {
  position: undefined,
  address: null
}

export const WithAddressOnly = Template.bind({})
WithAddressOnly.args = {
  position: [],
  address: 'Allegaten 6\n4400 Flekkefjord'
}
