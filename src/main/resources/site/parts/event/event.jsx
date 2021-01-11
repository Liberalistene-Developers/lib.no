import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from '../imageblock/imageblock.jsx';

const Event = ({
  headerColor,
  headerPosition,
  title,
  description,
  image,
  ingress,  
  tags,
  informationLabel
}) => (
  <div className="event">
    <ImageBlock title={title} image={image} ingress={ingress} text={headerColor} position={headerPosition} />
    
    { description && (
      <div className="details">
        <div className="info">
          { informationLabel && (
            <h2>{informationLabel}</h2>
          )}
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    )}
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