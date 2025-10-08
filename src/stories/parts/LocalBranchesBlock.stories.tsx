import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LocalBranchesBlock } from '@parts/localbranches/LocalBranchesBlock';

const meta = {
  title: 'Parts/LocalBranchesBlock',
  component: LocalBranchesBlock,
  tags: ['autodocs']
} satisfies Meta<typeof LocalBranchesBlock>;

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
