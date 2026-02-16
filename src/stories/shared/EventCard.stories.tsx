import preview from '../../../.storybook/preview'
import { EventCard } from '@common/EventCard/EventCard'

const meta = preview.meta({
  title: 'Shared/EventCard',
  component: EventCard,
  tags: ['autodocs']
})

export const Normal = meta.story({
  args: {
    image: {
      url: 'https://picsum.photos/400/300'
    },
    text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
    title: 'EventName',
    location: {
      address: 'Markensgate 39, Kristiansand'
    },
    date: '12:00'
  }
})

export const Virtual = meta.story({
  args: {
    ...Normal.input.args,
    location: {
      address: 'https://www.facebook.com/events/759331661457410/',
      name: 'Facebook'
    },
    locationType: 'virtual'
  }
})
