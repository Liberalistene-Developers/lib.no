import preview from '../../../.storybook/preview'
import { ArticleCard, type ItemData } from '@common/ArticleCard/ArticleCard'

const meta = preview.meta({
  title: 'Shared/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="article-list-holder">
        <div className="article-list gridlist">
          <Story />
        </div>
      </div>
    )
  ]
})

const sampleItem: ItemData = {
  image: {
    url: 'https://picsum.photos/400/300'
  },
  shortDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus',
  name: 'Lorem ipsum dolor sit amet',
  url: '#',
  authors: [
    {
      authorID: '1',
      personUrl: '#',
      person: 'Ronny Skjæveland',
      image: {
        url: 'https://picsum.photos/200/200'
      }
    }
  ],
  datePublished: '2020-12-10'
}

export const Normal = meta.story({
  args: {
    item: sampleItem
  }
})

export const WideLeft = meta.story({
  args: {
    item: sampleItem,
    presentation: true,
    direction: 'left'
  }
})

export const WideLeftNoDate = meta.story({
  args: {
    ...WideLeft.input.args,
    showDate: false
  }
})

export const WideRight = meta.story({
  args: {
    item: sampleItem,
    presentation: true,
    direction: 'right'
  }
})

export const WideRightNoDate = meta.story({
  args: {
    ...WideRight.input.args,
    showDate: false
  }
})
