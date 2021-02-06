import React from 'react';

import { MenuItem } from '../../main/resources/react4xp/libEntries/MenuItem.jsx';
import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Menu/MenuItem',

  component: MenuItem,
};

const Template = (args) => (
  <SingleLayout>
    <MenuItem {...args} />
  </SingleLayout>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Menu',
};
