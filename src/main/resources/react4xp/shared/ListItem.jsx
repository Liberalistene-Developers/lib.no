import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Image from './Image';

const ListItem = ({
  children,
  childrenLast = false,
  className,
  imageSize,
  imageType,
  showImage = true,
  item: {
    image,
    name,
    shortDescription,
    url,
  } = {},
  fields,
}) => (
  <div className={classNames('list-item', className)}>
    { showImage && (
      <Image image={image} className={imageSize} imageClassName={imageType} />
    )}

    { name && (
      <div className="list-item-content">
        <div className="list-item-title">
          <a href={url} title={name}>{name}</a>
        </div>
        {childrenLast === false && children}
        {shortDescription && (
          <div className="list-item-description">
            <div className="rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </div>
        )}
        {childrenLast && children}
      </div>
    )}
  </div>
);

ListItem.propTypes = {
  childrenLast: PropTypes.bool,
  imageSize: PropTypes.oneOf(['small', 'medium', 'large']),
  imageType: PropTypes.oneOf(['round', '']),
  showImage: PropTypes.bool,
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
  showImage: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
};

export default ListItem;

export {
  ListItem,
};
