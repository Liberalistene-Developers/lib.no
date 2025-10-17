import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LocalBranches } from '@common/LocalBranches/LocalBranches';

const meta = {
  title: 'Parts/LocalBranches',
  component: LocalBranches,
  tags: ['autodocs']
} satisfies Meta<typeof LocalBranches>;

export default meta;
type Story = StoryObj<typeof meta>;

const county = 'agder';
const branches = [
  'arendal',
  'farsund',
  'flekkefjord',
  'grimstad',
  'kristiansand',
  'lillesand',
  'mandal',
  'kvinesdal',
  'lyngdal',
  'risør',
  'tvedestrand'
];

export const Default: Story = {
  args: {
    title: 'Våre lokallag',
    headingClassName: 'center',
    items: branches.map((town) => ({
      path: `https://liberalistene.org/localt/${county}/${town}`,
      name: `${town.slice(0, 1).toUpperCase()}${town.slice(1)}`
    }))
  }
};
