import React from 'react'
import PropTypes from 'prop-types'

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
    <img src={image.url} alt={image.alternativeText} className={imageClassName} />
  )

  const content = url
    ? (
    <a href={url} title={title}>
      {picture}
    </a>
      )
    : picture

  return (
    <div className={className}>
      {content}
    </div>
  )
}

Image.propTypes = {
  /**
   * Class of image holder.
   */
  className: PropTypes.oneOf(['extra-small', 'small', 'medium', 'large', 'full', '']),

  /**
   * the image
   */
  image: PropTypes.shape({
    url: PropTypes.string,
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

const DefaultImage = (props) => <Image {...props} />
DefaultImage.displayName = 'Image'

export default DefaultImage
