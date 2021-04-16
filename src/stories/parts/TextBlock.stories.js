import React from 'react'

import TextBlock from '../../main/resources/react4xp/libEntries/TextBlock'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/TextBlock',

  component: TextBlock
}

const Template = (args) => (
  <SingleLayout>
    <TextBlock {...args} />
  </SingleLayout>
)

const title = 'My Title'
const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget interdum ex, sed tincidunt dolor. Aliquam non tellus ac felis viverra cursus in at arcu. Sed scelerisque, nisl eget ultrices aliquet, dolor diam commodo massa, non sollicitudin massa elit at lacus. Morbi et leo lobortis elit ultrices sodales vel nec leo. Quisque pharetra vel ligula ut vulputate. Suspendisse non nisl a dui posuere tempor. Nunc sed felis vel sapien rhoncus volutpat at sed sem. Pellentesque eu ex vel mauris lacinia commodo at ac lorem. Etiam pharetra velit non nulla pretium, molestie mattis lorem sollicitudin. Vestibulum ac metus ac tortor mattis cursus. Aliquam aliquet mauris consequat dapibus aliquet. Suspendisse vestibulum magna nec justo laoreet porta. Nullam id tempus arcu.
`

export const Empty = Template.bind({})
Empty.args = {
  text: '',
  title: '',
  titleColor: ''
}

export const Title = Template.bind({})
Title.args = {
  ...Empty.args,
  title
}

export const Text = Template.bind({})
Text.args = {
  ...Empty.args,
  text
}

export const TitleText = Template.bind({})
TitleText.args = {
  ...Empty.args,
  text,
  title
}
