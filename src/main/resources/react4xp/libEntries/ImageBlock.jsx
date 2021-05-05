import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from '../shared/Image'

export const ImageBlock = ({
  Tag,
  image,
  position = '',
  title = [],
  overlay = '',
  ingress = '',
  ingressColor = 'standard'
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
                  {title.map(({ title: titleText, titleColor, titleNoSpace }) => (
                    <span key={titleText} className={cx(titleColor, { nospace: titleNoSpace })}>
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
  title: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleNoSpace: PropTypes.bool
  })),
  ingress: PropTypes.string,
  ingressColor: PropTypes.string
}

ImageBlock.defaultProps = {
  Tag: 'h1',
  image: undefined,
  title: [],
  ingress: '',
  text: 'dark',
  position: 'right',
  ingressColor: 'standard'
}

export default (props) => <ImageBlock {...props} /> // eslint-disable-line react/display-name
