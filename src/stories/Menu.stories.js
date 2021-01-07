import React from 'react';

import { Menu } from '../main/resources/site/parts/menu/menu.jsx';

export default {
  title: 'Parts/Menu/Menu',
  
  component: Menu,
};

const Template = (args) => (
  <div className="content">
    <div className="content-item">
      <Menu {...args} />
    </div>
  </div>
);


export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: 'Menu',
    },
    {
      title: 'Menu',
    },
    {
      title: 'Menu',
    },
    {
      title: 'Menu',
    },
  ],
};


