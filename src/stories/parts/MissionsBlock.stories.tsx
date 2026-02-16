import preview from '../../../.storybook/preview'
import { MissionsBlock } from '@common/MissionsBlock/MissionsBlock'

const meta = preview.meta({
  title: 'Parts/MissionsBlock',
  component: MissionsBlock,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    items: [
      {
        description:
          'Liberalistene vil sikre større frihet for enkeltindividet ved å forby all innledning av fysisk tvang.',
        image: {
          url: 'https://picsum.photos/200/200?random=1'
        },
        title: 'Individuell frihet'
      },
      {
        description:
          'Liberalistene skaper et mer velstående samfunn ved å innføre sikker privat eiendomsrett.',
        image: {
          url: 'https://picsum.photos/200/200?random=2'
        },
        title: 'Økt velstand'
      },
      {
        description:
          'Liberalistene vil styrke politi, rettsvesen og forsvar, og fjerne alle ulover.',
        image: {
          url: 'https://picsum.photos/200/200?random=3'
        },
        title: 'Trygg hverdag'
      },
      {
        description:
          'Liberalistenes samfunn fører til et reelt mangfold: et mangfold av idéer, mennesker, produkter og løsninger.',
        image: {
          url: 'https://picsum.photos/200/200?random=4'
        },
        title: 'Større mangfold'
      }
    ]
  }
})
