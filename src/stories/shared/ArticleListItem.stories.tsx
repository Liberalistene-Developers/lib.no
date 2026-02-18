import preview from '../../../.storybook/preview'
import { ArticleListItem } from '@common/ArticleListItem/ArticleListItem'

const meta = preview.meta({
  title: 'Shared/ArticleListItem',
  component: ArticleListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="article-list list">
        <Story />
      </div>
    )
  ]
})

export const Normal = meta.story({
  args: {
    item: {
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus',
      name: 'Lorem ipsum dolor sit amet',
      url: '#',
      authors: [
        {
          authorID: 1,
          personUrl: '#',
          person: 'Ronny Skjæveland',
          image: {
            url: 'https://picsum.photos/200/200'
          }
        }
      ],
      datePublished: '2020-12-10'
    }
  }
})
