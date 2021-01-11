import React from 'react';

import { Map } from '../main/resources/react4xp/_entries/map.jsx';

export default {
  title: 'Parts/Map',
  
  component: Map,
};

const Template = (args) => (
  <div className="content">
    <div className="content-item">
      <div className="event">
        <div className="location">
          <Map {...args} />
        </div>
      </div>
    </div>
  </div>
);


export const Default = Template.bind({});
Default.args = {
};


