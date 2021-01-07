import React from 'react';
import PropTypes from 'prop-types';

import Image from '../image/image.jsx';

const ListItem = ({
  children,
  imageSize,
  imageType,
  item: {
    image,
    name,
    shortDescription,
    url,
  } = {},
  fields,
}) => (
  <div className="list-item">
    
    <Image image={image} className={imageSize} imageClassName={imageType} />
    
    { name && (
      <div className="list-item-content">
        <div className="list-item-title">
          <a href={url} title={name}>{name}</a>
        </div>
        {children}
        { shortDescription && (
          <div className="list-item-description">
            <span className="rich-text">
              {shortDescription}
            </span>
          </div>           
        )}
      </div>  
    )}
  </div>
);

ListItem.propTypes = {
  imageSize: PropTypes.oneOf(['small', 'medium', 'large']),
  imageType: PropTypes.oneOf(['round']),
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string,
  }),
};

ListItem.defaultProps = {
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
};

export default ListItem;

export {
  ListItem,
};
