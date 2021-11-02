import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from './Image'

export const GridItem = ({
  children,
  direction = '',
  imageSize,
  imageType,
  item: {
    image,
    name,
    shortDescription,
    url
  } = {},
  noIngress = false,
  presentation = false,
  readMore,
  readMoreEnabled = false,
  titleCenter = false
}) => (
  <div className={cx('grid-item', direction, { presentation })}>
     <Image image={image} className={imageSize} imageClassName={imageType} title={name} url={url} />

     { name && (
       <div className="grid-item-info">
         <div className={cx('grid-item-title', { center: titleCenter })}>
           <a href={url} title={name}>{name}</a>
         </div>
         { !noIngress && shortDescription && (
           <div className="grid-item-description">
             <div className="rich-text as-span" dangerouslySetInnerHTML={{ __html: shortDescription }} />
             { readMoreEnabled && readMore && (
               <a href={url} title={name} className="read-more">{readMore}</a>
             )}
           </div>
         )}
         { presentation && children}
       </div>
     )}
  </div>
)

GridItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  childrenLast: PropTypes.bool,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['right', 'left', '', undefined]),
  imageSize: PropTypes.oneOf(['small', 'medium', 'large', '']),
  imageType: PropTypes.oneOf(['round', '']),
  showImage: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string
  }),
  noIngress: PropTypes.bool,
  presentation: PropTypes.bool,
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool,
  titleCenter: PropTypes.bool
}

GridItem.defaultProps = {
  direction: '',
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
  noIngress: false,
  presentation: false,
  readMore: '',
  readMoreEnabled: false,
  showImage: true,
  titleCenter: false
}

export default (props) => <GridItem {...props} /> // eslint-disable-line react/display-name
