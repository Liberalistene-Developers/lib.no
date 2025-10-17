import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { BookList } from '@common/BookList/BookList';

const meta = {
  title: 'Parts/BookList',
  component: BookList,
  tags: ['autodocs']
} satisfies Meta<typeof BookList>;

export default meta;
type Story = StoryObj<typeof meta>;

const book = {
  image: {
    url: 'https://picsum.photos/157/239'
  },
  author: {
    name: 'Henry Hazlitt'
  },
  text: 'Innføringsbok i økonomisk teori som tar opp vanlige feilslutninger og som legger vekt på én sentral lekse: Økonomisk politikk må vurderes etter effekter på alle grupper over tid.',
  title: 'Economics in One Lesson',
  buyFromText: 'Kjøp hos',
  buy: {
    store: 'Amazon',
    url: 'https://amazon.com/buythisbook'
  }
};

export const Empty: Story = {
  args: {
    items: [],
    className: 'grid',
    buyFromText: 'Kjøp fra'
  }
};

export const Items: Story = {
  args: {
    ...Empty.args,
    items: [book, book, book, book]
  }
};
