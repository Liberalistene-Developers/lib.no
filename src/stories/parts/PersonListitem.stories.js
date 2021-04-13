import React from 'react';

import { PersonListItem } from '../../main/resources/react4xp/shared/PersonListItem';
import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Lists/PersonListItem',

  component: PersonListItem,
};

const Template = (args) => (
  <SingleLayout>
    <div className="list">
      <PersonListItem {...args} />
    </div>
  </SingleLayout>
);

const item = {
  itemId: 1,
  image: {
    url: 'kandidatbilde1.jpg',
  },
  name: 'Kenneth Tolås',
  role: 'Leder',
  email: 'kenneth@liberalistene.org',
  shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.',
};


export const Default = Template.bind({});
Default.args = {
  imageSize: 'medium',
  imageType: 'round',
  showEmail: false,
  item,
};

export const WithEmail = Template.bind({});
WithEmail.args = {
  imageSize: 'medium',
  imageType: 'round',
  showEmail: true,
  item,
};
