import preview from '../../../.storybook/preview'
import { Person } from '@common/Person/Person'

const meta = preview.meta({
  title: 'Parts/Person',
  component: Person,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    image: {
      url: 'https://picsum.photos/200/200'
    },
    title: 'Kenneth Tolås',
    shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.'
  }
})

export const WithEmail = meta.story({
  args: {
    ...Default.input.args,
    email: 'kenneth@liberalistene.org',
    emailPrefix: 'Send e-post til'
  }
})
