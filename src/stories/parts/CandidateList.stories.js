import React from 'react';

import { CandidateList } from '../../main/resources/react4xp/libEntries/CandidateList';
import { SingleLayout } from '../layouts';

export default {
  title: 'Parts/Lists/CandidateList',

  component: CandidateList,
};

const Template = (args) => (
  <SingleLayout>
    <CandidateList {...args} />
  </SingleLayout>
);


export const Default = Template.bind({});
Default.args = {
  imagesize: 'medium',
  imagetype: true,
  showRole: true,
  items: [
    {
      itemId: 1,
      image: {
        url: 'kandidatbilde1.jpg',
      },
      name: 'Kenneth Tolås',
      role: '1. kandidat',
      shortDescription: 'Kenneth Tolås er leder for Liberalistene Agder.',
    },
    {
      itemId: 2,
      name: 'Ronny Skjæveland',
      role: '2. kandidat',
      shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
      image: {
        url: 'partyleader.jpg',
      },
    },
  ],
};
