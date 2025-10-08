import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { EventCard } from '../../main/resources/react4xp/components/common/EventCard';

const meta = {
  title: 'Shared/EventCard',
  component: EventCard,
  tags: ['autodocs']
} satisfies Meta<typeof EventCard>;

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
      address: 'Markensgate 39, Kristiansand'
    },
    date: '12:00'
  }
};

export const Virtual: Story = {
  args: {
    ...Normal.args,
    location: {
      address: 'https://www.facebook.com/events/759331661457410/',
      name: 'Facebook'
    },
    locationType: 'virtual'
  }
};
