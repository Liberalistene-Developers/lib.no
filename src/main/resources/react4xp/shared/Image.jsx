import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

/**
 * Primary Image holder for solution.
 */
export const Image = ({
  className,
  image,
  imageClassName,
  url,
  title
}) => {
  if (!image) {
    return null
  }

  const picture = (
    <img src={image.url} alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop())} className={imageClassName} />
  )

  const content = url
    ? (
    <a href={url} title={title}>
      {picture}
    </a>
      )
    : picture

  return (
    <div className={cx(className, 'image', imageClassName)}>
      {content}
    </div>
  )
}

Image.propTypes = {
  /**
   * Class of image holder.
   */
  className: PropTypes.oneOf(['image-holder', 'extra-small', 'small', 'medium', 'large', 'full', '']),

  /**
   * the image
   */
  image: PropTypes.shape({
    url: PropTypes.string,
    displayName: PropTypes.string,
    alternativeText: PropTypes.string
  }),

  /**
   * Class of the image.
   */
  imageClassName: PropTypes.string,

  /**
   * Optional click handler
   */
  onClick: PropTypes.func,

  url: PropTypes.string,

  title: PropTypes.string
}

Image.defaultProps = {
  className: '',
  image: null,
  imageClassName: '',
  onClick: undefined,
  url: ''
}

export default (props) => <Image {...props} /> // eslint-disable-line react/display-name
