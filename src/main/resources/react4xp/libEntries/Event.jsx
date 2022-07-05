import React from 'react'
import PropTypes from 'prop-types'

import { ImageBlock } from './ImageBlock'
import { Schedules } from './Schedule'
import { EventPlace } from '../shared/EventPlace'
import { EventTime } from '../shared/EventTime'

import { MapLoader } from '../shared/MapLoader'

export const Event = ({
  date,
  editMode,
  time,
  headerColor,
  headerPosition,
  title,
  titleInImage,
  description,
  location,
  image,
  ingress,
  ingressInImage,
  tags,
  informationLabel,
  moreInformationLabel,
  locationLabel,
  contactLabel,
  placeLabel,
  agendaLabel = '',
  dateLabel,
  timeLabel,
  email,
  schedules = [],
  map = []
}) => (
  <div className="event">
    <ImageBlock
      title={titleInImage && [{ title, titleColor: headerColor }]}
      image={image}
      ingress={ingressInImage && ingress}
      position={headerPosition}
    />

    { !titleInImage && title && (
      <h1>{title}</h1>
    )}

    { !ingressInImage && ingress && (
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
    )}

    <div className="event-content">
        <div className="details">
          { description && (
            <div className="info">
              { informationLabel && (
                <h2 id={informationLabel}>{informationLabel}</h2>
              )}
              <div className="text rich-text" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}
          { email && (
            <div className="more-info">
              { moreInformationLabel && (
                <h2 id={moreInformationLabel}>{moreInformationLabel}</h2>
              )}
              <div className="email rich-text">
                {contactLabel} <a href={`mailto:${email}?subject=${title}`} rel="noreferrer">{email}</a>
              </div>
            </div>
          )}

          { schedules && schedules.length > 0
            ? (
            <div>
              { agendaLabel && (
                <h2 id={agendaLabel}>{agendaLabel}</h2>
              )}
              <Schedules schedules={schedules} />
            </div>
              )
            : null }

        </div>
      { ((map && map.length === 2) || (location && location.address)) && (
        <div className="location">
          { locationLabel && (
            <h2 id={locationLabel}>{locationLabel}</h2>
          )}

          <MapLoader position={map} address={location && location.address} editMode={editMode} />

          { location && (
            <EventPlace location={location} locationLabel={placeLabel} />
          )}

          { (date || time) && (
            <EventTime date={date} dateLabel={dateLabel} time={time} timeLabel={timeLabel} />
          )}

        </div>
      )}
    </div>
  </div>
)

Event.propTypes = {
  editMode: PropTypes.bool,
  /**
   * Display header as light or dark.
   */
  headerType: PropTypes.oneOf(['light', 'dark']),
  /**
   * Position of header.
   */
  headerPosition: PropTypes.oneOf(['left', 'center', 'right']),
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  ingress: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  headerColor: PropTypes.string,
  titleInImage: PropTypes.bool,
  ingressInImage: PropTypes.bool,
  informationLabel: PropTypes.string,
  moreInformationLabel: PropTypes.string,
  locationLabel: PropTypes.string,
  contactLabel: PropTypes.string,
  placeLabel: PropTypes.string,
  agendaLabel: PropTypes.string,
  dateLabel: PropTypes.string,
  timeLabel: PropTypes.string,
  email: PropTypes.string,
  schedules: PropTypes.array,
  location: PropTypes.shape({
    address: PropTypes.string
  }),
  tags: PropTypes.array,
  map: PropTypes.array
}

Event.defaultProps = {
  editMode: false,
  title: '',
  ingress: '',
  description: ''
}

export default (props) => <Event {...props} /> // eslint-disable-line react/display-name
