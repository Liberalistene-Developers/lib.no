import preview from '../../../.storybook/preview'
import { FancyCandidateImage } from '@common/Candidate/FancyCandidateImage'

const meta = preview.meta({
  title: 'Parts/FancyCandidateImage',
  component: FancyCandidateImage,
  tags: ['autodocs']
})

export const Normal = meta.story({
  args: {
    artImage: {
      url: 'https://example.com/backdrop-art.svg'
    },
    image: {
      url: 'https://picsum.photos/400/600'
    },
    title: 'Ronny Skjæveland',
    subTitle: '1 kandidat, Rogaland'
  }
})
