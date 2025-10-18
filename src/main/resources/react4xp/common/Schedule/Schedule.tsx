import {type FC} from 'react';
import cx from 'classnames';

import {AuthorLink} from '@common/AuthorLink/AuthorLink';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Represents a speaker for a topic
 */
interface Speaker {
  /** Unique speaker identifier */
  personID?: string;
  /** URL to speaker's page */
  personUrl?: string;
  /** Speaker's profile image */
  image?: {
    /** Image URL */
    url?: string;
  };
  /** Speaker's name */
  person?: string;
}

/**
 * Represents a topic/session in a schedule
 */
interface TopicType {
  /** Unique topic identifier */
  itemId?: string;
  /** Topic title */
  title?: string;
  /** List of speakers for this topic */
  speakers?: Speaker[];
  /** Start time (e.g., "10:00") */
  start?: string;
  /** Duration text (e.g., "45 min") */
  duration?: string;
  /** Topic description (HTML) */
  description?: string;
  /** Topic report/summary (HTML) */
  report?: string;
}

/**
 * Props for the TopicTitle component
 */
interface TopicTitleProps {
  /** Topic title */
  title?: string;
  /** Start time */
  start?: string;
  /** Duration text */
  duration?: string;
}

/**
 * TopicTitle component displays topic title with optional time and duration.
 *
 * Shows start time, title, and duration in a formatted inline layout.
 * Used internally by TopicTitleSelector.
 */
const TopicTitle: FC<TopicTitleProps> = ({title, start, duration}) => (
  <>
    {start && (
      <>
        <span className="topic-title-start">
          {start}
        </span>
        <span className="topic-title-divider">
          -
        </span>
      </>
    )}
    <span className="topic-title-name">
      {title}
    </span>
    {duration && (
      <span className="topic-title-duration">
        (<span style={{fontStyle: 'italic'}}>{duration}</span>)
      </span>
    )}
  </>
);

/**
 * Props for the TopicTitleSelector component
 */
interface TopicTitleSelectorProps {
  /** Topic title */
  title?: string;
  /** Start time */
  start?: string;
  /** Duration text */
  duration?: string;
  /** Topic description (determines if title should be wrapped in H4) */
  description?: string;
}

/**
 * TopicTitleSelector component wraps TopicTitle in H4 if description exists.
 *
 * Conditionally wraps the title in an H4 heading tag when a description
 * is present, otherwise renders the title inline. Used internally by Topic.
 */
const TopicTitleSelector: FC<TopicTitleSelectorProps> = ({title, start, duration, description}) => {
  const titleElement = (
    <TopicTitle title={title} start={start} duration={duration} />
  );

  if (description) {
    return (
      <h4>
        {titleElement}
      </h4>
    );
  }

  return titleElement;
};

/**
 * Props for the Topic component
 */
interface TopicProps {
  /** Topic data */
  topic: TopicType;
}

/**
 * Topic component displays a single topic/session with speakers and details.
 *
 * Renders a topic with title (including time and duration), speakers list,
 * description, and optional report. Speakers are displayed as linked items
 * with images. Used within Schedule to display individual sessions.
 *
 * @example
 * ```tsx
 * <Topic
 *   topic={{
 *     title: 'Opening Keynote',
 *     start: '09:00',
 *     duration: '1 hour',
 *     speakers: [{person: 'John Doe', personUrl: '/people/john'}],
 *     description: '<p>Welcome to the conference</p>'
 *   }}
 * />
 * ```
 */
export const Topic: FC<TopicProps> = ({topic: {title, speakers, start, duration, description, report}}) => (
  <div className="topic">
    <div className="topic-title">
      <TopicTitleSelector title={title} start={start} duration={duration} description={description || report} />
      {(speakers && speakers.length && (
        <div className={cx('topic-speakers', {start: !!start})}>
          <ul className="authors">
            {speakers.map(({personID, personUrl, image, person}) => (
              <AuthorLink key={personID} url={personUrl} image={image} author={person} />
            ))}
          </ul>
        </div>
      )) || null}
      {description && (
        <div className={cx('topic-description', {start: !!start})}>
          <SafeHtml html={description} />
        </div>
      )}
      {report && (
        <SafeHtml html={report} className={cx('topic-report', {start: !!start})} />
      )}
    </div>
  </div>
);

/**
 * Represents a schedule/day
 */
export interface ScheduleType {
  /** Unique schedule identifier */
  itemId?: string;
  /** Schedule name (e.g., "Day 1") */
  name?: string;
  /** Schedule date */
  date?: string;
  /** Schedule description (HTML) */
  description?: string;
  /** List of topics in this schedule */
  topics?: TopicType[];
}

/**
 * Props for the Schedule component
 */
interface ScheduleProps {
  /** Schedule data */
  schedule: ScheduleType;
}

/**
 * Schedule component displays a single day's schedule with topics.
 *
 * Renders a schedule with name, date, optional description, and list of
 * topics. Each topic shows time, speakers, and details. Used for displaying
 * event agendas, conference schedules, or meeting agendas.
 *
 * @example
 * ```tsx
 * <Schedule
 *   schedule={{
 *     name: 'Conference Day 1',
 *     date: '2024-05-15',
 *     description: '<p>Welcome day</p>',
 *     topics: [...]
 *   }}
 * />
 * ```
 */
export const Schedule: FC<ScheduleProps> = ({schedule: {name, date, description, topics}}) => (
  <div className="schedule">
    <div className="schedule-title">
      <h3>{name} {date && (<span className="schedule-title-date">{date}</span>)}</h3>
    </div>
    {description && (
      <div className="schedule-description">
        <SafeHtml html={description} />
      </div>
    )}
    <div className="topic-list">
      {topics && topics.map((topic) => (
        <Topic key={topic.itemId} topic={topic} />
      ))}
    </div>
  </div>
);

/**
 * Props for the Schedules component
 */
interface SchedulesProps {
  /** Array of schedules to display */
  schedules?: ScheduleType[];
}

/**
 * Schedules component displays multiple schedules in a vertical list.
 *
 * Renders a list of Schedule components, typically used for multi-day
 * events or conferences. Each schedule is displayed with its own topics.
 *
 * @example
 * ```tsx
 * <Schedules
 *   schedules={[
 *     {name: 'Day 1', date: '2024-05-15', topics: [...]},
 *     {name: 'Day 2', date: '2024-05-16', topics: [...]}
 *   ]}
 * />
 * ```
 */
export const Schedules: FC<SchedulesProps> = ({schedules = []}) => (
  <div className="schedule-list">
    {schedules && schedules.map((schedule) => (
      <Schedule key={schedule.itemId} schedule={schedule} />
    ))}
  </div>
);
