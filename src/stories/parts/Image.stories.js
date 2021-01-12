import React from 'react';

import { Image } from '../../main/resources/site/parts/image/image.jsx';

import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Image',
  component: Image,
};

const Template = (args) => (
  <SingleLayout>
    <Image {...args} />
  </SingleLayout>
);

const image = {
  url: 'kandidatbilde1.jpg',
};

export const Small = Template.bind({});
Small.args = {
  className: 'small',
  image,
  imageClassName: '',
};

export const Medium = Template.bind({});
Medium.args = {
  className: 'medium',
  image,
  imageClassName: '',
};

export const Large = Template.bind({});
Large.args = {
  className: 'large',
  image,
  imageClassName: '',
};

export const RoundSmall = Template.bind({});
RoundSmall.args = {
  className: 'small',
  image,
  imageClassName: 'round',
};

export const RoundMedium = Template.bind({});
RoundMedium.args = {
  className: 'medium',
  image,
  imageClassName: 'round',
};

export const RoundLarge = Template.bind({});
RoundLarge.args = {
  className: 'large',
  image,
  imageClassName: 'round',
};
