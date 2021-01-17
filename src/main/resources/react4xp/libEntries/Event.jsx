import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from './ImageBlock';
import { Map } from '../shared/Map';
import { EventPlace } from '../shared/EventPlace';
import { EventTime } from '../shared/EventTime';

const Event = ({
  date,
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
  dateLabel,
  timeLabel,
  email,
  map = [],
}) => (
  <div className="event">
    <ImageBlock
      title={titleInImage && title}
      image={image}
      ingress={ingressInImage && ingress} text={headerColor}
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
                {contactLabel} <a href={`mailto:${email}?subject=${title}`}>{email}</a>
              </div>
            </div>
          )}

        </div>
      { (map && map.length === 2) || (location && location.address) && (
        <div className="location">
          { locationLabel && (
            <h2 id={locationLabel}>{locationLabel}</h2>
          )}

          <Map position={map} address={location && location.address} />          
          <EventPlace location={location} locationLabel={placeLabel} />
          <EventTime date={date} dateLabel={dateLabel} time={time} timeLabel={timeLabel} />
        </div>        
      )}
    </div>
  </div>
);

Event.propTypes = {
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
    url: PropTypes.string,
  }),
  ingress: PropTypes.string,
  description: PropTypes.string,
};

Event.defaultProps = {
  title: '',
  ingress: '',
  description: '',
};

export default Event;

export {
  Event,
};
