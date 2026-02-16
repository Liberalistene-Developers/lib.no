import preview from '../../../.storybook/preview'
import { EventListItem } from '@common/EventListItem/EventListItem'

const meta = preview.meta({
  title: 'Shared/EventListItem',
  component: EventListItem,
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
      address:
        'Markensgate 39, Kristiansand, et veldig veldig veldig langt sted'
    },
    date: '12:00',
    url: 'https://example.com'
  }
})

export const Virtual = meta.story({
  args: {
    ...Normal.input.args,
    location: {
      address: 'https://www.facebook.com/events/759331661457410/',
      name: 'Facebook'
    },
    locationType: 'virtual',
    url: 'https://example.com'
  }
})
