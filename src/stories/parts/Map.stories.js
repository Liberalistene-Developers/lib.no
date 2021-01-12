import React from 'react';

import { Map } from '../../main/resources/react4xp/_entries/map.jsx';

import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Map',
  
  component: Map,
};

const Template = (args) => (
  <SingleLayout>
    <div className="event">
      <div className="location">
        <Map {...args} />
      </div>
    </div>
  </SingleLayout>
);


export const Default = Template.bind({});
Default.args = {
};


