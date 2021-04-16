import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from '../shared/Image'

export const ImageBlock = ({
  Tag,
  image,
  position,
  text,
  title,
  ingress,
  overlay
}) => (
  <div className="image-block">
    <Image image={image} className="full" />

    { (title || ingress) && (
      <div className={cx('content', position, overlay)}>
        { title && (
          <div className={`title ${text}`}>
            <Tag>{title}</Tag>
          </div>
        )}
        { ingress && (
          <div className="ingress" dangerouslySetInnerHTML={{ __html: ingress }} />
        )}
      </div>
    )}
  </div>
)

ImageBlock.propTypes = {
  Tag: PropTypes.oneOf(['h1', 'h2', 'h2']),
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  overlay: PropTypes.string,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  text: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.string,
  ingress: PropTypes.string
}

ImageBlock.defaultProps = {
  Tag: 'h1',
  image: undefined,
  title: '',
  ingress: '',
  text: 'dark',
  position: 'right'
}

const DefaultImageBlock = (props) => <ImageBlock {...props} />
DefaultImageBlock.displayName = 'ImageBlock'

export default DefaultImageBlock
