import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

/**
 * Primary Event Place holder for solution.
 */
export const EventPlace = ({
  location,
  locationLabel
}) => {
  const locationType = location.address ? 'place' : 'virtual'

  return (
    <div className="event-place">
      <FontAwesomeIcon icon={locationType === 'place' ? faMap : faGlobe} />  {locationLabel} <a href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.url} rel="noreferrer">{location.name || location.address.replace(/\n/g, ', ') || location.url }</a>
    </div>
  )
}

EventPlace.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string
  }),

  locationLabel: PropTypes.string
}

EventPlace.defaultProps = {
  location: {
    address: '',
    url: '',
    name: ''
  },
  locationLabel: 'Sted:'
}

export default (props) => <EventPlace {...props} /> // eslint-disable-line react/display-name
