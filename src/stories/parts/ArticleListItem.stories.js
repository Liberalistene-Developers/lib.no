import React from 'react'

import { ArticleListItem } from '../../main/resources/react4xp/shared/ArticleListItem'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Lists/ArticleListItem',
  component: ArticleListItem
}

const image = {
  url: 'partyleader.jpg'
}

const Template = (args) => (
  <SingleLayout>
    <div className="article list">
      <ArticleListItem {...args} />
    </div>
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  item: {
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus',
    name: 'Lorem ipsum dolor sit amet',
    url: '#',
    authors: [
      {
        authorID: 1,
        personUrl: '#',
        person: 'Ronny Skjæveland',
        image
      }
    ],
    datePublished: '2020-12-10'
  }
}
