import preview from '../../../.storybook/preview'
import { Mission } from '@common/Mission/Mission'

const meta = preview.meta({
  title: 'Parts/Mission',
  component: Mission,
  tags: ['autodocs']
})

export const Default = meta.story({
  args: {
    description:
      'Liberalistene vil sikre større frihet for enkeltindividet ved å forby all innledning av fysisk tvang.',
    image: {
      url: 'https://picsum.photos/200/200?random=1'
    },
    title: 'Individuell frihet'
  }
})
