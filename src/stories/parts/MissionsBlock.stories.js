import React from 'react'

import { MissionsBlock } from '../../main/resources/react4xp/libEntries/MissionsBlock'

import { SingleLayout } from '../layouts'

import MeditationImage from '../../../public/meditation.png'
import SeedImage from '../../../public/seed.png'
import PoliceImage from '../../../public/police.png'
import HeartImage from '../../../public/heart.png'

export default {
  title: 'Parts/MissionsBlock',

  component: MissionsBlock
}

const Template = (args) => (
  <SingleLayout background="light-purple">
    <MissionsBlock {...args} />
  </SingleLayout>
)

export const MissionsBlockSample = Template.bind({})
MissionsBlockSample.args = {
  items: [
    {
      description:
        'Liberalistene vil sikre større frihet for enkeltindividet ved å forby all innledning av fysisk tvang.',
      image: {
        url: MeditationImage
      },
      title: 'Individuell frihet'
    },

    {
      description:
        'Liberalistene skaper et mer velstående samfunn ved å innføre sikker privat eiendomsrett.',
      image: {
        url: SeedImage
      },
      title: 'Økt velstand'
    },

    {
      description:
        'Liberalistene vil styrke politi, rettsvesen og forsvar, og fjerne alle ulover.',
      image: {
        url: PoliceImage
      },
      title: 'Trygg hverdag'
    },

    {
      description:
        'Liberalistenes samfunn fører til et reelt mangfold: et mangfold av idéer, mennesker, produkter og løsninger.',
      image: {
        url: HeartImage
      },
      title: 'Større mangfold'
    }
  ]
}
