import React from 'react';

import { ListItem } from '../../main/resources/react4xp/shared/ListItem';
import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Lists/ListItem',

  component: ListItem,
};

const Template = (args) => (
  <SingleLayout>
    <div className="list">
      <ListItem {...args} />
    </div>
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
    shortDescription: 'Kenneth Tolås, 33 år gammel. Jeg kommer opprinnelig fra et småbruk i Hardanger, men har bodd på Sørlandet siden 2005. Jeg er utdannet mediegrafiker, og har jobbet mye frivillig med barn og ungdom. Jeg tror jeg er ganske effektiv og liker å få ting gjort, samtidig som jeg setter stor pris på å snakke med mennesker, både kjente og ukjente.',
  },
};
