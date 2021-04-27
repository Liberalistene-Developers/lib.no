import React from 'react'
import PropTypes from 'prop-types'

import { Image } from '../shared/Image'

export const FancyHeader = ({
  title = '',
  effect,
  image
}) => (
  <div className="orgHeader-grid-container">
    <div className="ogHeader-grid-item">
      <div className="headertitleWrapper">
        <div className="headertitle">
          <h1>{title}</h1>
        </div>
        <Image image={effect} />
      </div>
    </div>
    <Image image={image} className="orgHeader-grid-item" />
  </div>
)

FancyHeader.propTypes = {
  effect: PropTypes.shape({
    url: PropTypes.string
  }),
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  title: PropTypes.string
}

FancyHeader.defaultProps = {
  effect: null,
  image: null,
  title: ''
}

export default (props) => <FancyHeader {...props} /> // eslint-disable-line react/display-name
