import {type FC} from 'react';
import cx from 'classnames';

import {AuthorLink} from '@common/AuthorLink/AuthorLink';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

interface Speaker {
  personID?: string;
  personUrl?: string;
  image?: {
    url?: string;
  };
  person?: string;
}

interface TopicType {
  itemId?: string;
  title?: string;
  speakers?: Speaker[];
  start?: string;
  duration?: string;
  description?: string;
  report?: string;
}

interface TopicTitleProps {
  title?: string;
  start?: string;
  duration?: string;
}

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

interface TopicTitleSelectorProps {
  title?: string;
  start?: string;
  duration?: string;
  description?: string;
}

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

interface TopicProps {
  topic: TopicType;
}

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

export interface ScheduleType {
  itemId?: string;
  name?: string;
  date?: string;
  description?: string;
  topics?: TopicType[];
}

interface ScheduleProps {
  schedule: ScheduleType;
}

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

interface SchedulesProps {
  schedules?: ScheduleType[];
}

export const Schedules: FC<SchedulesProps> = ({schedules = []}) => (
  <div className="schedule-list">
    {schedules && schedules.map((schedule) => (
      <Schedule key={schedule.itemId} schedule={schedule} />
    ))}
  </div>
);
