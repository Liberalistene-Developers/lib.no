import {type FC} from 'react';
import {FAIcon} from '@common/FAIcon/FAIcon';

/**
 * Props for the EventTime component
 *
 * @property date - Event date string (e.g., "15. mars 2024")
 * @property dateLabel - Label text displayed before the date (e.g., "Dato:", "Date:")
 * @property time - Event time string (e.g., "18:00", "6:00 PM")
 * @property timeLabel - Label text displayed before the time (e.g., "Tid:", "Time:")
 */
interface EventTimeProps {
  date?: string;
  dateLabel?: string;
  time?: string;
  timeLabel?: string;
}

/**
 * Event date and time component that displays when an event takes place.
 *
 * The component shows a clock icon followed by formatted date and time information.
 * It uses the HTML `<time>` element with a proper `datetime` attribute for semantic
 * markup and accessibility.
 *
 * The component intelligently handles cases where only date or only time is provided,
 * and trims whitespace to ensure clean formatting.
 *
 * @example With both date and time
 * ```tsx
 * <EventTime
 *   date="15. mars 2024"
 *   dateLabel="Dato:"
 *   time="18:00"
 *   timeLabel="Tid:"
 * />
 * ```
 *
 * @example Date only
 * ```tsx
 * <EventTime
 *   date="20. april 2024"
 *   dateLabel="Dato:"
 * />
 * ```
 */
export const EventTime: FC<EventTimeProps> = ({
  date = '',
  dateLabel = '',
  time = '',
  timeLabel = ''
}) => (
  <div className="event-time">
    <FAIcon iconType="faClock" /> <time dateTime={`${date} ${time}`.trim()}>{date ? `${dateLabel} ${date}`.trim() : ''}&nbsp;{time ? `${timeLabel} ${time}`.trim() : ''}</time>
  </div>
);
