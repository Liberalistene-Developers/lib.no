import preview from '../../../.storybook/preview'
import { CandidateList } from '@common/CandidateList/CandidateList'

const meta = preview.meta({
  title: 'Parts/CandidateList',
  component: CandidateList,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    imagesize: 'medium',
    imagetype: true,
    showRole: true,
    items: [
      {
        itemId: 1,
        image: {
          url: 'https://picsum.photos/200/200?random=1'
        },
        name: 'Kenneth Tolås',
        role: '1. kandidat',
        shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.'
      },
      {
        itemId: 2,
        name: 'Ronny Skjæveland',
        role: '2. kandidat',
        shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
        image: {
          url: 'https://picsum.photos/200/200?random=2'
        }
      }
    ]
  }
})
