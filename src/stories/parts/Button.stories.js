import React from 'react';

import { Button } from '../../main/resources/react4xp/libEntries/Button';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Button',
  component: Button,
};

const Template = (args) => (
  <SingleLayout>
    <Button {...args} />
  </SingleLayout>
);

export const Normal = Template.bind({});
Normal.args = {
  title: 'Bli medlem',
  url: 'https://google.com'
};
