
import { BudgetCutPage } from '../../main/resources/react4xp/libEntries/BudgetCutPage'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/BudgetCutPage',
  component: BudgetCutPage
}

const Template = (args) => (
  <SingleLayout>
    <BudgetCutPage {...args} />
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  title: 'Kommunal- og moderningsdepartmentet',
  budget: 213638,
  cut: 8744,
  percent: 10,
  description: '<p>En beskrivelse av departmentet og hvorfor det er viktig å kutte.</p>',
  sumary: '<p><strong>Oppsummering:</strong><br />Vil vi gjerne forklare hvorfor</p>',
  labelSumCut: 'Sum kutt:',
  labelTitle: '',
  labelBudget: 'Budsjett',
  labelCut: 'Vi kutter',
  labelPercent: 'Prosent',
  labelNumberText: '* Alle tall er i hele millioner.',
  cuts: [
    {
      name: 'Administrasjon',
      budget: 1886,
      cut: 187,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    },
    {
      name: 'Fylkesmannsembedetene',
      budget: 2070,
      cut: 5015,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    },
    {
      name: 'Statlige byggeprosjekter og eiendomsforvaltning',
      budget: 2692,
      cut: 831,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    },
    {
      name: 'Distrikts- og regionalpolitikk',
      budget: 1347,
      cut: 1347,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    },
    {
      name: 'Tilskudd politiske partier',
      budget: 462,
      cut: 462,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    },
    {
      name: 'Bolig, bomiljø og bygg',
      budget: 3529,
      cut: 529,
      description: ''
    },
    {
      name: 'Planlegging, byutvikling og geodata',
      budget: 1326,
      cut: 560,
      description: '<p>Vil vi gjerne forklare hvorfor</p>'
    }
  ]
}
