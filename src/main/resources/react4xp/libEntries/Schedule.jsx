
import PropTypes from 'prop-types'

import cx from 'classnames'
import { AuthorLink } from '../shared/AuthorLink'

const TopicTitle = ({ title, start, duration }) => (
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
    { duration && (
      <span className="topic-title-duration">
        (<span style={{ fontStyle: 'italic' }}>{duration}</span>)
      </span>
    )}
  </>
)

TopicTitle.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  duration: PropTypes.string
}

const TopicTitleSelector = ({ title, start, duration, description }) => {
  const titleElement = (
    <TopicTitle title={title} start={start} duration={duration} />
  )

  if (description) {
    return (
      <h4>
        {titleElement}
      </h4>
    )
  }

  return titleElement
}

TopicTitleSelector.propTypes = {
  title: PropTypes.string,
  start: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string
}

export const Topic = ({ topic: { title, speakers, start, duration, description, report } }) => (
  <div className="topic">
    <div className="topic-title">
      <TopicTitleSelector title={title} start={start} duration={duration} description={description || report} />
      { (speakers && speakers.length && (
        <div className={cx('topic-speakers', { start: !!start })}>
          <ul className="authors">
            { speakers.map(({ personID, personUrl, image, person }) => (
              <AuthorLink key={personID} url={personUrl} image={image} author={person} />
            ))}
          </ul>
        </div>
      )) || null}
      { description && (
        <div className={cx('topic-description', { start: !!start })}>
          <div dangerouslySetInnerHTML={ { __html: description }} />
        </div>
      )}
      { report && (
        <div className={cx('topic-report', { start: !!start })} dangerouslySetInnerHTML={ { __html: report }} />
      )}
    </div>
  </div>
)

Topic.propTypes = {
  topic: PropTypes.shape({
    title: PropTypes.string,
    speakers: PropTypes.array,
    start: PropTypes.string,
    duration: PropTypes.string,
    description: PropTypes.string,
    report: PropTypes.string
  })
}

export const Schedule = ({ schedule: { name, date, description, topics } }) => (
  <div className="schedule">
    <div className="schedule-title">
      <h3>{name} {date && (<span className="schedule-title-date">{date}</span>)}</h3>
    </div>
    { description && (
      <div className="schedule-description">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    )}
    <div className="topic-list">
      { topics && topics.map((topic) => (
        <Topic key={topic.itemId} topic={topic} />
      ))}
    </div>
  </div>
)
Schedule.propTypes = {
  schedule: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    topics: PropTypes.array
  })
}

export const Schedules = ({ schedules = [] }) => (
  <div className="schedule-list">
    { schedules && schedules.map((schedule) => (
      <Schedule key={schedule.itemId} schedule={schedule} />
    ))}
  </div>
)

Schedules.propTypes = {
  schedules: PropTypes.array
}

export default (props) => <Schedules {...props} /> // eslint-disable-line react/display-name
