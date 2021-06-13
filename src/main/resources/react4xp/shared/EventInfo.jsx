import React from 'react'
import PropTypes from 'prop-types'

import { FAIcon } from './FAIconEdit'

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
      <FAIcon iconType={locationType === 'place' ? 'fa-map' : 'fa-globe'} />
        &nbsp;{locationLabel} <a
        href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.address}
        title={location.address}
      >
        {location.name || location.address}
      </a>
    </div>
    <div className="event-time" title={date}>
      <FAIcon iconType={'fa-clock'} /> <time dateTime={date}>{date}</time>
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
