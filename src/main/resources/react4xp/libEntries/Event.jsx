import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from './ImageBlock';
import { Map } from '../shared/Map';

const Event = ({  
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
  map,
}) => (
  <div className="event">
    <ImageBlock
      title={titleInImage && title}
      image={image}
      ingress={ingressInImage && shortDescription} text={headerColor}
      position={headerPosition}
    />
    
    { !titleInImage && title && (
      <h1>{title}</h1>
    )}
    
    { !ingressInImage && ingress && (
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
    )}

    <div className="event-content">
      { description && (
        <div className="details">
          <div className="info">
            { informationLabel && (
              <h2 id={informationLabel}>{informationLabel}</h2>
            )}
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      )}
      { (map && map.length === 2) || (location && location.address) && (
        <div>
          <Map position={map} address={location && location.address} />
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
