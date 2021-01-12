import React from 'react';

import { MenuItem } from '../../main/resources/site/parts/menuitem/menuitem.jsx';
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


