import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ArticleCard } from '../../main/resources/react4xp/components/shared/ArticleCard';

const meta = {
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
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItem = {
  image: {
    url: 'https://picsum.photos/400/300'
  },
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
};

export const Normal: Story = {
  args: {
    item: sampleItem
  }
};

export const WideLeft: Story = {
  args: {
    item: sampleItem,
    presentation: true,
    direction: 'left'
  }
};

export const WideLeftNoDate: Story = {
  args: {
    ...WideLeft.args,
    showDate: false
  }
};

export const WideRight: Story = {
  args: {
    item: sampleItem,
    presentation: true,
    direction: 'right'
  }
};

export const WideRightNoDate: Story = {
  args: {
    ...WideRight.args,
    showDate: false
  }
};
