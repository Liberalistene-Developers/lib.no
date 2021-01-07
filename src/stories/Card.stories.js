import React from 'react';

import { Card } from '../main/resources/site/parts/card/card.jsx';

import '../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Cards/Card',
  component: Card,
};

const image = {
  url: 'cardimage.png',
};

const Template = (args) => (
  <div className="content">
    <div className="content-item">
      <div style={ { width: 496 }}>
        <Card {...args} />
      </div>
    </div>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  image,
  text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
  title: 'H3 Title',
};
