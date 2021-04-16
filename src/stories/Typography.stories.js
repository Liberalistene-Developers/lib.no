import React from 'react'

import { SingleLayout } from './layouts'

const Typography = () => (
  <SingleLayout>
    <h1>Tittel</h1>
    <p></p>
    <h2>Seksjonstitle</h2>
    <p></p>
    <h3>Undertitle</h3>
    <p></p>

    <div className="rich-text">
      Rik tekst:
      <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus
      </p>
    </div>

    <div>
      Tekst:
      <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus
      </p>
    </div>

    <div style={{ height: 60 }}>
      Social Icons
      <div className="social-icons">
        <i className="fab fa-twitter"></i>
        <i className="fab fa-facebook"></i>
      </div>
    </div>
  </SingleLayout>
)

export default {
  title: 'Lib.no/Typography',
  component: Typography,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => <Typography {...args} />

export const Overview = Template.bind({})
Overview.args = {}
