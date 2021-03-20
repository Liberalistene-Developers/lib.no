import React from 'react';

import { Join } from '../../main/resources/react4xp/libEntries/Join';

import { SingleLayout } from '../layouts';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Join',
  component: Join,
};

const Template = (args) => (
  <>
    <SingleLayout>
      <div>En liten tekst</div>
    </SingleLayout>
    <SingleLayout>
      <Join {...args} />
    </SingleLayout>
    <SingleLayout>
      <div>En liten tekst</div>
    </SingleLayout>
  </>
);

export const Text = Template.bind({});
Text.args = {
  image: null,
  message: 'Bli medlem',
  buttonText: 'Bli medlem',
};
