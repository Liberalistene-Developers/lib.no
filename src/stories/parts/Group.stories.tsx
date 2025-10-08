import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Group } from '@parts/group/Group';

const meta = {
  title: 'Parts/Group',
  component: Group,
  tags: ['autodocs']
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    headerColor: 'light',
    headerPosition: 'right',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem a felis posuere, eu convallis lorem tempor. Sed efficitur varius dictum. Quisque tellus sapien, lobortis eget elementum ut, dignissim sed mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida convallis ante, eu porttitor nulla lobortis et. Proin nulla dui, feugiat ut arcu vitae, finibus consequat dolor. Morbi aliquet ex vel eleifend auctor. Integer placerat leo ac laoreet interdum.',
    image: {
      url: 'https://picsum.photos/1200/458'
    },
    title: 'GroupName',
    titleInImage: true,
    location: {
      address: 'Markensgate 39, Kristiansand'
    },
    informationLabel: 'Informasjon'
  }
};
