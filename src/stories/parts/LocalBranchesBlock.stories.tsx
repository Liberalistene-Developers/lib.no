import preview from '../../../.storybook/preview'
import { LocalBranches } from '@common/LocalBranches/LocalBranches'

const meta = preview.meta({
  title: 'Parts/LocalBranches',
  component: LocalBranches,
  tags: ['autodocs']
})

const county = 'agder'
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
]

export const Default = meta.story({
  args: {
    title: 'Våre lokallag',
    headingClassName: 'center',
    items: branches.map((town) => ({
      path: `https://liberalistene.org/localt/${county}/${town}`,
      name: `${town.slice(0, 1).toUpperCase()}${town.slice(1)}`
    }))
  }
})
