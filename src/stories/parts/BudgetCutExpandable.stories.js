import React from 'react'

import { BudgetCutItem } from '../../main/resources/react4xp/libEntries/BudgetCutExpandable'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/BudgetCut/Expandable',
  component: BudgetCutItem
}

const Template = (args) => (
  <SingleLayout>
    <BudgetCutItem {...args} />
  </SingleLayout>
)

export const Normal = Template.bind({})
Normal.args = {
  title: 'Kommunal- og moderningsdepartmentet',
  budget: 213638,
  cut: 4535.30,
  percent: 2.1,

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
      percent: 10,
      description: '<p>Tilbakeføring til 2020-nivå.</p>'
    },
    {
      name: 'Statsforvalterembetene',
      budget: 2070,
      cut: 517,
      percent: 25,
      description: ''
    },
    {
      name: 'Statlige byggeprosjekter og eiendomsforvaltning',
      budget: 2692,
      cut: 831,
      percent: 30.9,
      description: '<p>Videreføring av byggeprosjekter beholdes inntil disse er ferdige. Kongelige eiendommer kan vedlikeholdes via Kongens apanasje.</p>'
    },
    {
      name: 'Samiske formål',
      budget: 531,
      cut: 100,
      percent: 17.8,
      description: ''
    },
    {
      name: 'Distrikts- og regionalpolitikk',
      budget: 1347,
      cut: 1347,
      percent: 100,
      description: ''
    },
    {
      name: 'Tilskudd politiske partier',
      budget: 462,
      cut: 462,
      percent: 100,
      description: ''
    },
    {
      name: 'Bolig, bomiljø og bygg',
      budget: 3529,
      cut: 529,
      percent: 15,
      description: ''
    },
    {
      name: 'Planlegging, byutvikling og geodata',
      budget: 1326,
      cut: 560,
      percent: 42.2,
      description: '<p>Statens kartverk kuttes med 20% men videreføres inntil privatisering kan ordnes. Alt annet legges ned.</p>'
    }
  ]
}
