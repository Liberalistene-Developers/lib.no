import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Person } from '@common/Person/Person';

const meta = {
  title: 'Parts/Person',
  component: Person,
  tags: ['autodocs']
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: {
      url: 'https://picsum.photos/200/200'
    },
    title: 'Kenneth Tolås',
    shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.'
  }
};

export const WithEmail: Story = {
  args: {
    ...Default.args,
    email: 'kenneth@liberalistene.org',
    emailPrefix: 'Send e-post til'
  }
};
