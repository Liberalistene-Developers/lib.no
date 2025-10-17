import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Event } from '@common/Event/Event';

const meta = {
  title: 'Parts/Event',
  component: Event,
  tags: ['autodocs']
} satisfies Meta<typeof Event>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    headerColor: 'light',
    headerPosition: 'right',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.',
    ingress:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus libero vel egesta. Supreat consectetur adipiscing elit.',
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    ingressInImage: true,
    title: 'EventName',
    titleInImage: true,
    location: {
      address: 'Markensgate 39\nKristiansand'
    },
    time: '12:00',
    timeLabel: 'Kl:',
    date: undefined,
    dateLabel: undefined,
    email: 'post@liberalistene.no',
    informationLabel: 'Informasjon',
    locationLabel: 'Lokasjon',
    moreInformationLabel: 'Er det noe du lurer på?',
    contactLabel: 'Kontakt oss på'
  }
};

export const Virtual: Story = {
  args: {
    ...Normal.args,
    location: {
      url: 'https://www.facebook.com/events/759331661457410/',
      name: 'Facebook'
    },
    locationType: 'virtual'
  }
};
