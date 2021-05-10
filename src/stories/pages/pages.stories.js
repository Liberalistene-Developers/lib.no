import React from 'react'

import { Page } from './Page'

import { SingleLayout } from '../layouts/Layout'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Pages/Default',
  component: Page
}

const Template = (args) => (
  <Page {...args}>
    <SingleLayout {...args}>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h1>Lorem ipsum</h1>

        <p className="rich-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.
        </p>
      </div>
    </SingleLayout>
  </Page>
)

export const Default = Template.bind({})
Default.args = {
}
