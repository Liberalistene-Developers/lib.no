
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
  fullWidth: PropTypes.bool
}

export const SentralStyret = Template.bind({})
SentralStyret.args = {
  title: 'Liberalistene Sentralstyre',
  boardTitle: 'Styre',
  board: [
    {
      itemId: 1,
      name: 'Ronny Skjæveland',
      role: 'Partileder',
      shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
      image: {
        url: 'partyleader.jpg'
      }
    },
    {
      itemId: 2,
      name: 'Roald Ribe',
      role: 'Politisk Nestleder',
      shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
      image: {
        url: 'politicalnestleader.jpg'
      }
    },
    {
      itemId: 3,
      name: 'Aleksander Aas',
      role: 'Organisatorisk Nestleder',
      shortDescription: 'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
      image: {
        url: 'orgnestleader.jpg'
      }
    },
    {
      itemId: 4,
      name: 'Jan-Øyvind Lorgen',
      role: 'Sekretær',
      shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
      image: {
        url: 'secretary.jpg'
      }
    },
    {
      itemId: 5,
      name: 'Amund Farberg',
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
      shortDescription: 'Nicolay Normann Grundt er styremedlem i Liberalistene.',
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
