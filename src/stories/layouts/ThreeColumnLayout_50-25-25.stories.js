import React from 'react'

import { ThreeColumnLayout } from './Layout'
import { Page } from '../pages'

export default {
  title: 'Layouts/ThreeColumnLayout/50-25-25',

  component: ThreeColumnLayout
}

const Template = (args) => (
  <Page>
    <ThreeColumnLayout {...args}>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h1>Lorem ipsum 1</h1>

        <p className="rich-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
        </p>
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h1>Lorem ipsum 2</h1>

        <p className="rich-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
        </p>
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h1>Lorem ipsum 3</h1>

        <p className="rich-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
        </p>
      </div>
    </ThreeColumnLayout>
  </Page>
)

export const StandardBackground = Template.bind({})
StandardBackground.args = {
  background: 'standard',
  fullWidth: false,
  paddingBottom: false,
  paddingTop: false,
  middleClassName: 'one-25',
  leftClassName: 'one',
  rightClassName: 'one-25'
}

export const StandardBackgroundFullWidth = Template.bind({})
StandardBackgroundFullWidth.args = {
  ...StandardBackground.args,
  fullWidth: true
}

export const PurpleBackground = Template.bind({})
PurpleBackground.args = {
  ...StandardBackground.args,
  background: 'purple'
}

export const PurpleBackgroundFullWidth = Template.bind({})
PurpleBackgroundFullWidth.args = {
  ...PurpleBackground.args,
  fullWidth: true
}

export const PurpleBackgroundPaddingTop = Template.bind({})
PurpleBackgroundPaddingTop.args = {
  ...PurpleBackground.args,
  paddingTop: true
}

export const PurpleBackgroundPaddingBottom = Template.bind({})
PurpleBackgroundPaddingBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true
}

export const PurpleBackgroundPaddingTopAndBottom = Template.bind({})
PurpleBackgroundPaddingTopAndBottom.args = {
  ...PurpleBackground.args,
  paddingBottom: true,
  paddingTop: true
}

export const WhiteBackground = Template.bind({})
WhiteBackground.args = {
  ...StandardBackground.args,
  background: 'white'
}

export const WhiteBackgroundFullWidth = Template.bind({})
WhiteBackgroundFullWidth.args = {
  ...WhiteBackground.args,
  fullWidth: true
}

export const YellowBackground = Template.bind({})
YellowBackground.args = {
  ...StandardBackground.args,
  background: 'yellow'
}

export const YellowBackgroundFullWidth = Template.bind({})
YellowBackgroundFullWidth.args = {
  ...YellowBackground.args,
  fullWidth: true
}
