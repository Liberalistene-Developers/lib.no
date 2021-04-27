import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from '../shared/Image'

console.info(cx);

export const ImageBlock = ({
  Tag,
  image,
  position = '',
  title = [],
  overlay = '',
  ingress = '',
  ingressColor = 'standard',
}) => (
  <div className="image-block">
    <Image image={image} className="full" />

    { (title || ingress) && (
      <div className={cx('content', position, overlay)}>
        { ((title && title.length > 0) || ingress) && (
          <div className="image-block-text">
            { title && title.length > 0 && (
              <div className="title">
                <Tag>
                  {title.map(({ title: titleText, titleColor }) => (
                    <span className={titleColor}>
                      {titleText}
                    </span>
                  ))}
                </Tag>
              </div>
            )}
            { ingress && (
              <div className={cx('ingress', ingressColor)} dangerouslySetInnerHTML={{ __html: ingress }} />
            )}
          </div>
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
