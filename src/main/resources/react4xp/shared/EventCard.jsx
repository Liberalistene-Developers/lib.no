import React from 'react'
import PropTypes from 'prop-types'

import { Card } from './Card'
import { EventInfo } from '../shared/EventInfo'

/**
 * Primary Image holder for solution.
 */
export const EventCard = ({
  children,
  date,
  image,
  location,
  locationType,
  locationLabel,
  noIngress,
  title,
  text,
  url
}) => {
  return (
    <Card image={image} title={title} text={text} noIngress={noIngress} url={url}>
      <EventInfo
        location={location}
        locationLabel={locationLabel}
        date={date}
      />
    </Card>
  )
}

EventCard.propTypes = {
  ...Card.propTypes,

  location: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string
  }),

  locationLabel: PropTypes.string,

  locationType: PropTypes.oneOf(['place', 'virtual']),

  url: PropTypes.string
}

EventCard.defaultProps = {
  ...Card.defaultProps,
  image: null,
  location: {
    address: ''
  },
  locationLabel: 'Sted:',
  locationType: 'place',
  url: ''
}

export default (props) => <EventCard {...props} /> // eslint-disable-line react/display-name
