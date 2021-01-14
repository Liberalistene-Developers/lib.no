import React from 'react';

import { Event } from '../../main/resources/react4xp/_entries/Event';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Event',
  component: Event,
};

const image = {
  url: 'imageblockimage.png',
};

const Template = (args) => (
  <SingleLayout>
    <Event {...args} />
  </SingleLayout>
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
