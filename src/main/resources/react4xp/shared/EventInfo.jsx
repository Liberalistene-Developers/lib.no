import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

/**
 * Primary Image holder for solution.
 */
export const EventInfo = ({
  date,
  location,
  locationType,
  locationLabel
}) => (
  <div className="event-info">
    <div className="event-place">
      <FontAwesomeIcon icon={locationType === 'place' ? faMap : faGlobe} />  {locationLabel} <a
        href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.address}
        title={location.address}
      >
        {location.name || location.address}
      </a>
    </div>
    <div className="event-time" title={date}>
      <FontAwesomeIcon icon={faClock} /> <time dateTime={date}>{date}</time>
    </div>
  </div>
)

EventInfo.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string
  }),

  locationLabel: PropTypes.string,

  locationType: PropTypes.oneOf(['place', 'virtual']),
  date: PropTypes.string
}

EventInfo.defaultProps = {
  location: {
    address: '',
    name: ''
  },
  locationLabel: 'Sted:',
  locationType: 'place',
  date: ''
}

export default (props) => <EventInfo {...props} /> // eslint-disable-line react/display-name
