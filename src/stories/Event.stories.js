import React from 'react';

import { Event } from '../main/resources/site/parts/event/event.jsx';

import '../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Event',
  component: Event,
};

const image = {
  url: 'imageblockimage.png',
};

const Template = (args) => (
  <main>
    <div className="content">
      <div className="content-item">
        <Event {...args} />
      </div>
    </div>
  </main>
);

export const Normal = Template.bind({});
Normal.args = {
  headerType: 'light',
  headerPosition: 'right',
  image,
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

