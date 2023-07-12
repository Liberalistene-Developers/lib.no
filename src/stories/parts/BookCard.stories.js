import React from 'react'

import { BookCard } from '../../main/resources/react4xp/libEntries/BookCard'

import { SingleLayout } from '../layouts'

import BookImage from '../../../public/book1.png'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Cards/BookCard',
  component: BookCard
}

const image = {
  url: BookImage
}

const Template = (args) => (
  <SingleLayout>
    <div className="bookcard-list grid">
      <BookCard {...args} />
      <BookCard {...args} />
      <BookCard {...args} />
    </div>
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
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
