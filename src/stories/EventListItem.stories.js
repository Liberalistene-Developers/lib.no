import React from 'react';

import { EventListItem } from '../main/resources/site/parts/eventlistitem/eventlistitem.jsx';

import '../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Lists/EventListItem',
  component: EventListItem,
};

const image = {
  url: 'cardimage.png',
};

const Template = (args) => (
  <div className="content">
    <div className="content-item">
      <EventListItem {...args} />
    </div>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  image,
  text: `Rik Tekst:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula, libero vel egestas fringilla, purus tortor faucibus`,
  title: 'EventName',
  location: {
    address: 'Markensgate 39, Kristiansand'
  },
  date: '12:00'
};

export const Virtual = Template.bind({});
Virtual.args = {
  ...Normal.args,
  location: {
    address: 'https://www.facebook.com/events/759331661457410/',
    name: 'Facebook',
  },
  locationType: 'virtual',
}

