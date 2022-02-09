
import PropTypes from 'prop-types'

import { Board } from '../../main/resources/react4xp/libEntries/Board'

import { SingleLayout } from '../layouts'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Board',
  component: Board
}

const Template = ({ fullWidth, ...args }) => (
  <SingleLayout fullWidth={fullWidth}>
    <Board {...args} />
  </SingleLayout>
)

Template.propTypes = {
  ...Board.propTypes,
  fullWidth: PropTypes.bool
}

export const SentralStyret = Template.bind({})
SentralStyret.args = {
  board: [
    {
      name: 'Ronny Skjæveland',
      role: 'Partileder',
      shortDescription: 'Ronny Skjæveland er partileder i Liberalistene',
      image: {
        url: 'partyleader.jpg'
      }
    },
    {
      name: 'Roald Ribe',
      role: 'Politisk Nestleder',
      shortDescription: 'Roald Ribe er politisk nestleder i Liberalistene.',
      image: {
        url: 'politicalnestleader.jpg'
      }
    },
    {
      name: 'Aleksander Aas',
      role: 'Organisatorisk Nestleder',
      shortDescription: 'Aleksander Aas er organisatorisk nestleder i Liberalistene.',
      image: {
        url: 'orgnestleader.jpg'
      }
    },
    {
      name: 'Jan-Øyvind Lorgen',
      role: 'Sekretær',
      shortDescription: 'Jan-Øyvind Lorgen er sekretær i Liberalistene.',
      image: {
        url: 'secretary.jpg'
      }
    },
    {
      name: 'Amund Farberg',
      role: 'Styremedlem',
      shortDescription: 'Amund Farberg er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember1.jpg'
      }
    },
    {
      name: 'Nicolay Normann Grundt',
      role: 'Styremedlem',
      shortDescription: 'Nicolay Normann Grundt er styremedlem i Liberalistene.',
      image: {
        url: 'boardmember2.jpg'
      }
    },
    {
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
  fullWidth: true
}
