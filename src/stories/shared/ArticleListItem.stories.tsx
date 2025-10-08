import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ArticleListItem } from '../../main/resources/react4xp/components/common/ArticleListItem';

const meta = {
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
} satisfies Meta<typeof ArticleListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
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
};
