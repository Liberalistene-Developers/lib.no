import React from 'react'

import { Card } from '../../main/resources/react4xp/shared/Card'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Cards/Card',
  component: Card
}

const image = {
  url: 'cardimage.png'
}

const Template = (args) => (
  <SingleLayout>
    <div style={ { width: 496 }}>
      <Card {...args} />
    </div>
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  image,
  text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
  title: 'H3 Title'
}
