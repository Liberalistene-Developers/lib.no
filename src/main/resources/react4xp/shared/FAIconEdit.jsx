
import PropTypes from 'prop-types'

export const FAIcon = ({ iconType }) => (
  <i className={`fa ${iconType}`}></i>
)

FAIcon.propTypes = {
  iconType: PropTypes.string
}

export default FAIcon
