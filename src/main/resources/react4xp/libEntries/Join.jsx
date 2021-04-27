import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Button from './Button'

import Image from '../shared/Image'

export const Join = ({
  message,
  backMessage,
  image = null,
  url,
  buttonText,
  className,
  frontPlacement
}) => (
  <div className="join-container">
    <div className={cx('join', 'middle')}>
      <div className="join-front">
        <div className={cx('join-front-content', frontPlacement)}>
          <Image image={image} className="image-holder"/>
          { message && (
            <div className="join-front-text" dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </div>
      </div>
      <div className="join-back">
        <div className="join-back-content middle">
          { backMessage && (
            <div className="join-back-text" dangerouslySetInnerHTML={{ __html: backMessage }} />
          )}
          <Button
            className="light"
            title={buttonText}
            url={url}
          />
        </div>
      </div>
    </div>
  </div>
)

Join.propTypes = {
  message: PropTypes.string,
  backMessage: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  url: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  frontPlacement: PropTypes.string
}

export default (props) => <Join {...props} /> // eslint-disable-line react/display-name
