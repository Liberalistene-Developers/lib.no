import React from 'react'

import { Join } from '../../main/resources/react4xp/libEntries/Join'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Join',
  component: Join
}

const Template = (args) => (
  <>
    <SingleLayout>
      <div>En liten tekst</div>
    </SingleLayout>
    <SingleLayout>
      <Join {...args} />
    </SingleLayout>
    <SingleLayout>
      <div>En liten tekst</div>
    </SingleLayout>
  </>
)

export const Text = Template.bind({})
Text.args = {
  image: null,
  message: 'Bli medlem',
  buttonText: 'Bli medlem'
}

export const TextColumn = Template.bind({})
TextColumn.args = {
  ...Text.args,
  frontPlacement: 'column'
}

export const ImageAndTextRow = Template.bind({})
ImageAndTextRow.args = {
  image: {
    url: 'Bli med pil.png'
  },
  message: 'Bli medlem',
  buttonText: 'Bli medlem',
  frontPlacement: 'row'
}

export const ImageAndTextColumn = Template.bind({})
ImageAndTextColumn.args = {
  ...ImageAndTextRow.args,
  frontPlacement: 'column'
}

export const TwitterImageAndTextRow = Template.bind({})
TwitterImageAndTextRow.args = {
  image: {
    url: 'twitter.svg'
  },
  message: 'Bli medlem',
  buttonText: 'Bli medlem',
  frontPlacement: 'row'
}

export const TwitterImageAndTextColumn = Template.bind({})
TwitterImageAndTextColumn.args = {
  ...TwitterImageAndTextRow.args,
  frontPlacement: 'column'
}
