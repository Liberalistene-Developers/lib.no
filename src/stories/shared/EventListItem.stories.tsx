import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { EventListItem } from '../../main/resources/react4xp/components/shared/EventListItem';

const meta = {
  title: 'Shared/EventListItem',
  component: EventListItem,
  tags: ['autodocs']
} satisfies Meta<typeof EventListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    image: {
      url: 'https://picsum.photos/400/300'
    },
    text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
    title: 'EventName',
    location: {
      address: 'Markensgate 39, Kristiansand, et veldig veldig veldig langt sted'
    },
    date: '12:00',
    url: 'https://example.com'
  }
};

export const Virtual: Story = {
  args: {
    ...Normal.args,
    location: {
      address: 'https://www.facebook.com/events/759331661457410/',
      name: 'Facebook'
    },
    locationType: 'virtual',
    url: 'https://example.com'
  }
};
