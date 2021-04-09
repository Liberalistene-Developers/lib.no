import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'

import { Card } from './Card';
import { EventPlace } from '../shared/EventPlace';
import { EventTime } from '../shared/EventTime';

/**
 * Primary Image holder for solution.
 */
export const EventCard = ({
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
        <EventPlace location={location} locationLabel={locationLabel} />
        <EventTime date={date} />
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

export default (props) => <EventCard {...props} />;