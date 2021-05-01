import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from './ListItem'
import { EventInfo } from './EventInfo'

/**
 * Primary Image holder for solution.
 */
export const EventListItem = ({
  children,
  date,
  location,
  locationType,
  locationLabel,
  title,
  text,
  url
}) => {
  const item = {
    name: title,
    shortDescription: text,
    url
  }

  return (
    <ListItem item={item}>
      <EventInfo
        location={location}
        locationLabel={locationLabel}
        date={date}
      />
    </ListItem>
  )
}

EventListItem.propTypes = {
  ...ListItem.propTypes,

  location: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string
  }),

  locationLabel: PropTypes.string,

  locationType: PropTypes.oneOf(['place', 'virtual'])
}

EventListItem.defaultProps = {
  ...ListItem.defaultProps,
  location: {
    address: ''
  },
  locationLabel: 'Sted:',
  locationType: 'place'
}

export default (props) => <EventListItem {...props} /> // eslint-disable-line react/display-name
