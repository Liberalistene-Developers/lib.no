import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Image from './Image'

export const ListItem = ({
  children,
  childrenLast = false,
  className,
  imageSize,
  imageType,
  showImage = true,
  showDescriptions = true,
  item: {
    image,
    name,
    shortDescription,
    url
  } = {}
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
        {showDescriptions && shortDescription && (
          <div className="list-item-description">
            <div className="rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </div>
        )}
        {childrenLast && children}
      </div>
    )}
  </div>
)

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  childrenLast: PropTypes.bool,
  className: PropTypes.string,
  imageSize: PropTypes.oneOf(['small', 'medium', 'large']),
  imageType: PropTypes.oneOf(['round', '']),
  showImage: PropTypes.bool,
  showDescriptions: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  })
}

ListItem.defaultProps = {
  showImage: true,
  showDescriptions: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined
}

export default (props) => <ListItem {...props} /> // eslint-disable-line react/display-name
