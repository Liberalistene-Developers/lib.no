
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

const iconResolver = {
  faMap,
  faGlobe,
  faClock
}

const FAIcon = ({ iconType }) => (
  <FontAwesomeIcon icon={iconResolver[iconType]} />
)

FAIcon.propTypes = {
  iconType: PropTypes.string
}

export default FAIcon
