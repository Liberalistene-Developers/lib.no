import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Image } from './Image'

export const CandidatePresentationItem = ({
  className,
  image,
  name,
  place,
  position,
  ingress,
  description,
  preText,
  url
}) => {
  const subTitle = []

  if (position) {
    subTitle.push(position)
  }

  if (place) {
    subTitle.push(place)
  }

  return (
    <div className={cx('candidate-presentation', 'item', className)}>
      <Image image={image} title={name} className="image" url={url} />
      <div className="content">
        <div className="title">
          <h3>
            {preText && (
              <span className="pre-text">{preText}&nbsp;</span>
            )}
            {name}
          </h3>
        </div>
        {(place || position) && (
          <div className="sub-title">
            {subTitle.join(', ')}
          </div>
        )}

        {ingress && (
          <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
        )}

        {description && (
          <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
    </div>
  )
}

CandidatePresentationItem.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  name: PropTypes.string,
  position: PropTypes.string,
  place: PropTypes.string,
  ingress: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  preText: PropTypes.string,
  url: PropTypes.string
}

CandidatePresentationItem.defaultProps = {
  image: undefined,
  name: '',
  position: '',
  place: '',
  ingress: '',
  description: '',
  preText: ''
}

export default (props) => <CandidatePresentationItem {...props} /> // eslint-disable-line react/display-name
