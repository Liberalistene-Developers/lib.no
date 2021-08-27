import React from 'react'

import { Person } from '../../main/resources/site/parts/person/person.jsx'
import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/Person',

  component: Person
}

const Template = (args) => (
  <SingleLayout>
    <Person {...args} />
  </SingleLayout>
)

export const Default = Template.bind({})
Default.args = {
  image: {
    url: 'kandidatbilde1.jpg'
  },
  title: 'Kenneth Tolås',
  shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.'
}

export const WithEmail = Template.bind({})
WithEmail.args = {
  ...Default.args,
  email: 'kenneth@liberalistene.org',
  emailPrefix: 'Send e-post til'
}
