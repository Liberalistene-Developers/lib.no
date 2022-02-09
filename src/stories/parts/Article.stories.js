
import { Article } from '../../main/resources/react4xp/libEntries/Article'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Article',
  component: Article
}

const image = {
  url: 'imageblockimage.png'
}

const Template = (args) => (
  <SingleLayout>
    <Article {...args} />
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  headerColor: 'light',
  headerPosition: 'right',
  text: `
    <p><strong><em>Oslo, 6. oktober 2014</em>:</strong> Våren 2014 hadde en liten gjeng et stiftelsesmøte i Oslo, og etter flere forberedelser er resultatet <a href="http://liberalistene.org/">Liberalistene</a>. Dette&nbsp;et flunkende nytt parti med hovedvekt på individuell frihet, trygg hverdag, økt velstand og større mangfold. En sterk nedsettelse av skatter og avgifter, kraftig deregulering av alle markeder og en styrkning av personvern og rettsstatlige prinsipper er flere av nøkkelsakene.</p>

    <p>Prinsipprogram og vedtekter er på plass, og i løpet av det kommende året skal den politiske plattformen bygges ut fullstendig med et komplett valgprogram. I tillegg begynner rekrutteringen av andre liberale sjeler i det vidstrakte land, samt forberedelser frem til det første ordinære landsmøtet i mai 2015. Etter dette begynner ferden mot å bli et landsdekkende parti, og mot stortingsvalget i 2017.</p>

    <p>– Jeg ser frem til utfordringer og mye moro når Liberalistene tar opp kampen for økt frihet til alle mennesker i Norge, sier Espen Hagen Hammer, leder for interimstyret i partiet. Han fortsetter: – Vi er et ungt og fremtidsrettet parti, og oppfordrer alle liberale mennesker til å melde seg inn eller oppsøke oss for å slå av en prat.</p>

    <p>Det midlertidige sentralstyret i Liberalistene varer frem til neste års landsmøte, og består av Espen Hagen Hammer (leder), Agnethe Johnsen (nestleder), Eigil Knudsen, Arnt Rune Flekstad, Christina Solli, Asbjørn Ness og Vegard Ottervig, med varamedlemmene Kjetil Knausgård, Maximilian Vincent Hagelien og Jan-Øyvind Lorgen.</p>

    <p>Liberalistenes ledelse er spredt over hele Norge, men hovedbasen er i Oslo. Nettsiden er <a href="http://liberalistene.org/">Liberalistene.org</a>.</p>

    <p>Kontakt partileder Espen Hagen Hammer:</p>

    <p>E-post: <a href="mailto:espen@liberalistene.org">espen@liberalistene.org</a></p>

    <p>Prinsipprogram:&nbsp;<a href="http://liberalistene.org/politikk/partiprogram/">http://liberalistene.org/politikk/partiprogram/</a></p>

    <p>Se bilder på vår Flickr-konto:</p>

    <p><a href="https://www.flickr.com/photos/liberalistene/">https://www.flickr.com/photos/liberalistene/</a></p>
`,
  image,
  ingress: 'Nå får Norge et nytt og friskt parti som kjemper for konsekvent liberalisme.',
  ingressInImage: false,
  title: 'Norge får ny, liberal røst: Liberalistene',
  titleInImage: false,
  location: {
    address: 'Markensgate 39, Kristiansand'
  },
  authors: [
    {
      authorId: 1,
      personUrl: '/person',
      person: 'Liberalistene',
      image: {
        url: 'kandidatbilde1.png'
      }
    }
  ],
  informationLabel: 'Informasjon'
}
