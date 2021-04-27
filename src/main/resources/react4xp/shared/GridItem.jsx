import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'

export const GridItem = ({
  imageSize,
  imageType,
  item: {
    image,
    name,
    shortDescription,
    url
  } = {},
  readMore,
  readMoreEnabled = false,
  noIngress = false
}) => (
  <div className="grid-item">

     <Image image={image} className={imageSize} imageClassName={imageType} title={name} url={url} />

     { name && (
       <div className="grid-item-info">
         <div className="grid-item-title">
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
       </div>
     )}
  </div>
)

GridItem.propTypes = {
  children: PropTypes.array,
  childrenLast: PropTypes.bool,
  className: PropTypes.string,
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
  readMore: PropTypes.string,
  readMoreEnabled: PropTypes.bool
}

GridItem.defaultProps = {
  showImage: true,
  imageSize: 'medium',
  imageType: undefined,
  item: undefined,
  noIngress: false,
  readMore: '',
  readMoreEnabled: false
}

export default (props) => <GridItem {...props} /> // eslint-disable-line react/display-name
