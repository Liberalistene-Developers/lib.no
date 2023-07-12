import React from 'react'

import { BookList } from '../../main/resources/react4xp/libEntries/BookList'

import { SingleLayout } from '../layouts'

import BookImage from '../../../public/book1.png'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Lists/BookList',
  component: BookList
}

const image = {
  url: BookImage
}

const book = {
  image,
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
}

const Template = (args) => (
  <SingleLayout>
    <div className="bookcard-list grid">
      <BookList {...args} />
    </div>
  </SingleLayout>
)

export const Empty = Template.bind({})
Empty.args = {
  items: [],
  className: 'grid',
  buyFromText: 'Kjøp fra'
}

export const Items = Template.bind({})
Items.args = {
  ...Empty.args,
  items: [book, book, book, book]
}
