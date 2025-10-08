import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProgrammeMain } from '@parts/programme-main/ProgrammeMain';

const meta = {
  title: 'Parts/ProgrammeMain',
  component: ProgrammeMain,
  tags: ['autodocs']
} satisfies Meta<typeof ProgrammeMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Fylkesprogram',
    sections: [
      {
        title: 'Innledning',
        description: `
    <p className="Standard">
      Liberalistene skal male regionen lilla. Desentralisering av
      makt og innflytelse er grunnleggende. Det betyr stadig mer
      frihet til den enkelte borger og mindre innflytelse til
      politiske og byråkratiske organer. Den viktigste oppgaven
      for Liberalistenes regionspolitikere blir å redusere
      fylkeskommunens arbeidsoppgaver, alternativt få flere
      arbeidsoppgaver fra staten, hvis det kan bidra til å
      redusere statens omfang.
    </p>

    <p className="Standard">
      Liberalistene vil konsekvent arbeide for det prinsippet at
      beslutninger skal fattes nærmest mulig individet, dersom
      ikke individet selv tillates å fatte beslutningen. Derfor
      ser vi positivt på regionalisering av Norge. Dersom det
      politiske Norge lykkes med å redusere det offentliges
      oppgaver vesentlig kan vi være positive til å fjerne
      regionsleddet i forvaltningen. Men det gir ingen mening å
      fordele regionenes ansatte og arbeidsoppgaver på staten og
      kommunene og så fjerne regionene. Oppgavene må fjernes
      permanent fra offentlig sektor og det er useriøst å late som
      om det er noe å spare på å fjerne et forvaltningsnivå når
      man mener staten skal ha samme størrelse og vokse videre i
      samme takt som før.
    </p>
    `
      }
    ],
    tableOfContent: false
  }
};
