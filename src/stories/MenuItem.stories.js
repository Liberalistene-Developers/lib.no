import React from 'react';

import { MenuItem } from '../main/resources/site/parts/menuitem/menuitem.jsx';

export default {
  title: 'Parts/Menu/MenuItem',
  
  component: MenuItem,
};

const Template = (args) => <MenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Menu',
};


