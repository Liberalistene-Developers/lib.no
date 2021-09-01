import React from 'react'
import PropTypes from 'prop-types'

export const FancyCandidateImage = ({
  artImage,
  image,
  title,
  subTitle
}) => (
  <div className="fancy-candidate-image-wrapper">

    { (artImage || image) && (
      <figure className="fancy-candidate-image-figure">
        <a>
          { artImage && (
            <img className="fancy-candidate-image-art" src={artImage.url} alt={artImage.alternativeText || artImage.displayName || (artImage.url && artImage.url.split('?')[0].split('/').pop())} />
          )}

          { image && (
            <img className="fancy-candidate-image-image" src={image.url} alt={image.alternativeText || image.displayName || (image.url && image.url.split('?')[0].split('/').pop())} />
          )}
        </a>
      </figure>
    )}

    { title && (
      <div className="fancy-candidate-image-title">
        <h1>{title}</h1>
      </div>
    )}

    { subTitle && (
      <div className="trapezoid">
        <h2 className="trapezoid-text">{subTitle}</h2>
      </div>
    )}
  </div>
)

FancyCandidateImage.propTypes = {
  artImage: PropTypes.shape({
    url: PropTypes.string,
    displayName: PropTypes.string,
    alternativeText: PropTypes.string
  }),
  image: PropTypes.shape({
    url: PropTypes.string,
    displayName: PropTypes.string,
    alternativeText: PropTypes.string
  }),
  title: PropTypes.string,
  subTitle: PropTypes.string
}

FancyCandidateImage.defaultProps = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

export default (props) => <FancyCandidateImage {...props} /> // eslint-disable-line react/display-name
