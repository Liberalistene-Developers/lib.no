import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

/**
 * Primary Event Place holder for solution.
 */
export const EventTime = ({
  date,
  dateLabel,
  time,
  timeLabel,
}) => {
  const locationType = location.address ? 'place' : 'virtual';
  
  return (
    <div className="event-time">
      <FontAwesomeIcon icon={faClock} /> <time datetime={`${date} ${time}`.trim()}>{date ? `${dateLabel} ${date}`.trim() : ''}&nbsp;{ time ? `${timeLabel} ${time}`.trim() : ''}</time>
    </div>

  );
};

EventTime.propTypes = {
  date: PropTypes.string,
  dateLabel: PropTypes.string,
  time: PropTypes.string,
  timeLabel: PropTypes.string,  
};

EventTime.defaultProps = {
  date: '',
  dateLabel: '',
  time: '',
  timeLabel: '',
};

export default (props) => <EventTime {...props} />;
