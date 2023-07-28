import React from 'react'

import { IntroBlock } from '../../main/resources/react4xp/libEntries/IntroBlock'

import { SingleLayout } from '../layouts'

import IntroBlockImage from '../../../public/groupimage.png'

export default {
  title: 'Parts/IntroBlock',

  component: IntroBlock
}

const Template = (args) => (
  <SingleLayout>
    <IntroBlock {...args} />
  </SingleLayout>
)

export const IntroBlockSample = Template.bind({})
IntroBlockSample.args = {
  caption: 'Fra venstre: Per, Pål og Espen Askeladd',
  description: `
    I en tid der liberale verdier er under stort press, både i Norge og i resten av verden, trengs et parti som står opp for individuell frihet, likhet for loven og brorskap mot tyrrani.
    <br /><br />
    Som <strong>Vikens liberalistiske parti</strong> kjemper vi i Liberalistene for å gi hvert enkelt menneske størst mulig frihet under ansvar. Vårt mål er at Viken skal være et rikt, tolerant og næringsvennlig fylke.
    <br /><br />
    Sammen tar vi Viken fremover. <strong>Bli med på laget</strong>!
  `,
  image: {
    url: IntroBlockImage
  },
  title: 'Stå opp for individuell frihet!'
}
