import React from 'react'
import PropTypes from 'prop-types'

import { FancyCandidateImage } from './FancyCandidateImage'
import { Image } from '../shared/Image'

export const CandidatePage = ({
  fancyImage,
  artImage,
  image,
  ingress,
  description,
  title,
  position
}) => (
  <div className="candidate-page-wrapper">
    { (fancyImage && (
      <FancyCandidateImage
        artImage={artImage}
        image={image}
        title={title}
        subTitle={position}
      />
    )) || (
      <div className="candidate-page-header">
        <Image image={image} className="candidate-page-image" />
        { title && (
          <div className="candidate-page-header-title">
            <h1>{title}</h1>
            <h2>{position}</h2>
          </div>
        )}
      </div>
    )}
    <div className="page-content">
      { ingress && (
        <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
      )}

      { description && (
        <div className="candidate-page-description" dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  </div>
)

CandidatePage.propTypes = {
  fancyImage: PropTypes.bool,
  artImage: PropTypes.shape({
    url: PropTypes.string
  }),
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  ingress: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  position: PropTypes.string
}

CandidatePage.defaultProps = {
  fancyImage: true,
  artImage: null,
  image: null,
  ingress: '',
  description: '',
  title: '',
  position: ''
}

export default (props) => <CandidatePage {...props} /> // eslint-disable-line react/display-name
