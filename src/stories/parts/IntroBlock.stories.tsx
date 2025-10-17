import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { IntroBlock } from '@common/IntroBlock/IntroBlock';

const meta = {
  title: 'Parts/IntroBlock',
  component: IntroBlock,
  tags: ['autodocs']
} satisfies Meta<typeof IntroBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    caption: 'Fra venstre: Per, Pål og Espen Askeladd',
    description: `
      I en tid der liberale verdier er under stort press, både i Norge og i resten av verden, trengs et parti som står opp for individuell frihet, likhet for loven og brorskap mot tyranni.
      <br /><br />
      Som <strong>Vikens liberalistiske parti</strong> kjemper vi i Liberalistene for å gi hvert enkelt menneske størst mulig frihet under ansvar. Vårt mål er at Viken skal være et rikt, tolerant og næringsvennlig fylke.
      <br /><br />
      Sammen tar vi Viken fremover. <strong>Bli med på laget</strong>!
    `,
    image: {
      url: 'https://picsum.photos/800/600'
    },
    title: 'Stå opp for individuell frihet!'
  }
};
