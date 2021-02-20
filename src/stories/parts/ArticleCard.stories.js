import React from 'react';

import { ArticleCard } from '../../main/resources/react4xp/shared/ArticleCard';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Card/ArticleCard',
  component: ArticleCard,
};

const image = {
  url: 'partyleader.jpg',
};

const Template = (args) => (
  <SingleLayout>
    <div className="article grid">
      <ArticleCard {...args} />
    </div>
  </SingleLayout>
);

export const Normal = Template.bind({});
Normal.args = {
  item: {
    image: {
      url: 'cardimage.png',
    },
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
    name: 'Lorem ipsum dolor sit amet',
    url: '#',
    authors: [
      {
        authorID: 1,
        personUrl: '#',
        person: 'Ronny Skjæveland',
        image,
      },
    ],
    datePublished: '2020-12-10',
  },
};