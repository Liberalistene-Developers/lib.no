import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

import { ListItem } from '../listitem/listitem.jsx';

/**
 * Primary Image holder for solution.
 */
const EventListItem = ({
  children,
  date,
  location,
  locationType,
  locationLabel,
  title,
  text,
}) => {
  const item = {
    name: title,
    shortDescription: text,
  };
  return (
    <ListItem item={item}>
      <div className="event-info">
        <div className="event-place">
          <FontAwesomeIcon icon={locationType === 'place' ? faMap : faGlobe} />  {locationLabel} <a href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.address}>{location.name || location.address}</a>
        </div>
        <div className="event-time">
          <FontAwesomeIcon icon={faClock} /> <time datetime={date}>{date}</time>
        </div>
      </div>
    </ListItem>
  );
};

EventListItem.propTypes = {
  ...ListItem.propTypes,
  
  location: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
  }),
  
  locationLabel: PropTypes.string,
  
  locationType: PropTypes.oneOf(['place', 'virtual']),
};

EventListItem.defaultProps = {
  ...ListItem.defaultProps,
  location: {
    address: '',
  },
  locationLabel: 'Sted:',
  locationType: 'place',
};

export default EventListItem;

export {
  EventListItem,
};