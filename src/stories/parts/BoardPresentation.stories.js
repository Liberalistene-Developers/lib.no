import React from 'react'
import PropTypes from 'prop-types'

import { BoardPresentation } from '../../main/resources/react4xp/libEntries/BoardPresentation'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/BoardPresentation',
  component: BoardPresentation
}

const Template = ({ fullWidth, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <BoardPresentation {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...BoardPresentation.propTypes,
  fullWidth: PropTypes.bool,
  showEmail: PropTypes.oneOf(['no', 'first', 'all'])
}

export const SentralStyret = Template.bind({})
SentralStyret.args = {
  title: 'Liberalistene Sentralstyre',
  boardTitle: 'Styre',
  showEmail: 'no',
  board: [
    {
      itemId: 1,
      name: 'Ronny Skjæveland',
      email: 'ronny@liberalistene.no',
      role: 'Partileder',
      shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
      image: {
        url: 'partyleader.jpg'
      }
    },
    {
      itemId: 2,
      name: 'Roald Ribe',
      email: 'roald@liberalistene.no',
      role: 'Politisk Nestleder',
      shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
      image: {
        url: 'politicalnestleader.jpg'
      }
    },
    {
      itemId: 3,
      name: 'Aleksander Aas',
      email: 'ass@liberalistene.no',
      role: 'Organisatorisk Nestleder',
      shortDescription:
        'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
      image: {
        url: 'orgnestleader.jpg'
      }
    },
    {
      itemId: 4,
      name: 'Jan-Øyvind Lorgen',
      email: 'lorgen@liberalistene.no',
      role: 'Sekretær',
      shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
      image: {
        url: 'secretary.jpg'
      }
    },
    {
      itemId: 5,
      name: 'Amund Farberg',
      email: 'amund.farberg@liberalistene.no',
      role: 'Styremedlem',
      shortDescription: 'Amund Farberg er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember1.jpg'
      }
    },
    {
      itemId: 6,
      name: 'Nicolay Normann Grundt',
      role: 'Styremedlem',
      shortDescription:
        'Nicolay Normann Grundt er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember2.jpg'
      }
    },
    {
      itemId: 7,
      name: 'Daisy Sælem Hafstad',
      role: 'Styremedlem',
      shortDescription: 'Daisy Sælem Hafstad er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember3.jpg'
      }
    }
  ],
  imagesize: 'medium',
  imagetype: 'round',
  fullWidth: false
}

export const SentralStyretEmailFirst = Template.bind({})
SentralStyretEmailFirst.args = {
  ...SentralStyret.args,
  showEmail: 'first'
}

export const SentralStyretEmailAll = Template.bind({})
SentralStyretEmailAll.args = {
  ...SentralStyret.args,
  showEmail: 'all'
}
