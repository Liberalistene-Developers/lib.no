import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Mission } from '../../main/resources/react4xp/components/parts/missionsblock/Mission';

const meta = {
  title: 'Parts/Mission',
  component: Mission,
  tags: ['autodocs']
} satisfies Meta<typeof Mission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description:
      'Liberalistene vil sikre større frihet for enkeltindividet ved å forby all innledning av fysisk tvang.',
    image: {
      url: 'https://picsum.photos/200/200?random=1'
    },
    title: 'Individuell frihet'
  }
};
