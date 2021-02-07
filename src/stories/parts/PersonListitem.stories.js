import React from 'react';

import { PersonListItem } from '../../main/resources/react4xp/shared/PersonListItem';
import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Lists/PersonListItem',

  component: PersonListItem,
};

const Template = (args) => (
  <SingleLayout>
    <PersonListItem {...args} />
  </SingleLayout>
);


export const Default = Template.bind({});
Default.args = {
  imageSize: 'medium',
  imageType: 'round',
  item: {
    image: {
      url: 'kandidatbilde1.jpg',
    },
    name: 'Kenneth Tolås',
    role: 'Leder',
    shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.',
  },
};
