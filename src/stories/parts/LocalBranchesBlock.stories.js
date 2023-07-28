import React from 'react'

import { LocalBranchesBlock } from '../../main/resources/react4xp/libEntries/LocalBranchesBlock'

import { SingleLayout } from '../layouts'

export default {
  title: 'Parts/LocalBranchesBlock',

  component: LocalBranchesBlock
}

const Template = (args) => (
  <SingleLayout background="light-purple">
    <LocalBranchesBlock {...args} />
  </SingleLayout>
)

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

export const LocalBranchesBlockSample = Template.bind({})
LocalBranchesBlockSample.args = {
  title: 'Våre lokallag',
  headingClassName: 'center',
  items: branches.map((town) => ({
    path: `https://liberalistene.org/localt/${county}/${town}`,
    name: `${town.slice(0, 1).toUpperCase()}${town.slice(1)}`
  }))
}
