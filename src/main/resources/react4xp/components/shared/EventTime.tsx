import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface EventTimeProps {
  date?: string;
  dateLabel?: string;
  time?: string;
  timeLabel?: string;
}

/**
 * Primary Event Place holder for solution.
 */
export const EventTime: React.FC<EventTimeProps> = ({
  date = '',
  dateLabel = '',
  time = '',
  timeLabel = ''
}) => (
  <div className="event-time">
    <FontAwesomeIcon icon={faClock} /> <time dateTime={`${date} ${time}`.trim()}>{date ? `${dateLabel} ${date}`.trim() : ''}&nbsp;{time ? `${timeLabel} ${time}`.trim() : ''}</time>
  </div>
);
