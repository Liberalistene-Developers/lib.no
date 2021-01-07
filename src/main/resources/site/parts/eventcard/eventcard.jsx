import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

import { Card } from '../card/card.jsx';

/**
 * Primary Image holder for solution.
 */
const EventCard = ({
  children,
  date,
  location,
  locationType,
  locationLabel,
  image,
  title,
  text,
}) => {
  return (
    <Card image={image} title={title} text={text}>
      <div className="event-info">
        <div className="event-place">
          <FontAwesomeIcon icon={locationType === 'place' ? faMap : faGlobe} />  {locationLabel} <a href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.address}>{location.name || location.address}</a>
        </div>
        <div className="event-time">
          <FontAwesomeIcon icon={faClock} /> <time datetime={date}>{date}</time>
        </div>
      </div>
    </Card>
  );
};

EventCard.propTypes = {
  ...Card.propTypes,
  
  location: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
  }),
  
  locationLabel: PropTypes.string,
  
  locationType: PropTypes.oneOf(['place', 'virtual']),
};

EventCard.defaultProps = {
  ...Card.defaultProps,
  image: null,
  location: {
    address: '',
  },
  locationLabel: 'Sted:',
  locationType: 'place',
};

export default EventCard;

export {
  EventCard,
};