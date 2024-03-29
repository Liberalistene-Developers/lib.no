import React from 'react'

import { ImageBlock } from '../../main/resources/react4xp/libEntries/ImageBlock'

import { SingleLayout } from '../layouts'

import ImageBlockImage from '../../../public/imageblockimage.png'

export default {
  title: 'Parts/ImageBlock',

  component: ImageBlock
}

const Template = (args) => (
  <SingleLayout>
    <ImageBlock {...args} />
  </SingleLayout>
)

export const NoHeader = Template.bind({})
NoHeader.args = {
  image: {
    url: ImageBlockImage
  }
}

export const H1RightLight = Template.bind({})
H1RightLight.storyName = 'H1 Right Light'
H1RightLight.args = {
  ...NoHeader.args,
  title: [{ title: 'H1 Header', titleColor: 'light' }],
  Tag: 'h1'
}
export const H1RightIngressLight = Template.bind({})
H1RightIngressLight.storyName = 'H1 Right Light with Ingress'
H1RightIngressLight.args = {
  ...H1RightLight.args,
  ingress: '<p>My ingress is nice</p>'
}

export const H1LeftLight = Template.bind({})
H1LeftLight.storyName = 'H1 Left Light'
H1LeftLight.args = {
  ...H1RightLight.args,
  position: 'left'
}

export const H1CenterLight = Template.bind({})
H1CenterLight.storyName = 'H1 Center Light'
H1CenterLight.args = {
  ...H1RightLight.args,
  position: 'center'
}

export const H1CenterLightMobileHalf = Template.bind({})
H1CenterLightMobileHalf.storyName = 'H1 Center Light Mobile 1/2'
H1CenterLightMobileHalf.args = {
  ...H1CenterLight.args,
  titleClassName: 'half'
}

export const H1CenterLightMobileTreeQuarter = Template.bind({})
H1CenterLightMobileTreeQuarter.storyName = 'H1 Center Light Mobile 3/4'
H1CenterLightMobileTreeQuarter.args = {
  ...H1CenterLight.args,
  titleClassName: 'treequarter'
}

export const H1CenterLightMobileQuarter = Template.bind({})
H1CenterLightMobileQuarter.storyName = 'H1 Center Light Mobile 1/4'
H1CenterLightMobileQuarter.args = {
  ...H1CenterLight.args,
  titleClassName: 'quarter'
}

export const H2RightLight = Template.bind({})
H2RightLight.storyName = 'H2 Right Light'
H2RightLight.args = {
  ...NoHeader.args,
  title: [{ title: 'H2 Header', titleColor: 'light' }],
  Tag: 'h2'
}

export const H2LeftLight = Template.bind({})
H2LeftLight.storyName = 'H2 Left Light'
H2LeftLight.args = {
  ...H2RightLight.args,
  position: 'left'
}

export const H2CenterLight = Template.bind({})
H2CenterLight.storyName = 'H2 Center Light'
H2CenterLight.args = {
  ...H2RightLight.args,
  position: 'center'
}

export const H3RightLight = Template.bind({})
H3RightLight.storyName = 'H3 Right Light'
H3RightLight.args = {
  ...NoHeader.args,
  title: [
    { title: 'H3', titleColor: 'light' },
    { title: 'Header', titleColor: 'yellow' }
  ],
  Tag: 'h3'
}

export const H3RightLightOverlay = Template.bind({})
H3RightLightOverlay.storyName = 'H3 Right Light Overlay'
H3RightLightOverlay.args = {
  ...H3RightLight.args,
  overlay: 'overlay purple'
}

export const H3LeftLight = Template.bind({})
H3LeftLight.storyName = 'H3 Left Light'
H3LeftLight.args = {
  ...H3RightLight.args,
  position: 'left'
}

export const H3LeftLightOverlay = Template.bind({})
H3LeftLightOverlay.storyName = 'H3 Left Light Overlay'
H3LeftLightOverlay.args = {
  ...H3LeftLight.args,
  overlay: 'overlay purple'
}

export const H3CenterLight = Template.bind({})
H3CenterLight.storyName = 'H3 Center Light'
H3CenterLight.args = {
  ...H3RightLight.args,
  position: 'center'
}
