import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

export const Button = ({
  title,
  target = undefined,
  url,
  className,
  onClick
}) => (
  <div className="button-wrapper">
    <a
      href={url}
      target={target}
      className={cx('button', 'paper-raise', className)}
      onClick={onClick}
    >
      {title}
    </a>
  </div>
)

Button.propTypes = {
  title: PropTypes.string,
  target: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  target: undefined
}

export default (props) => <Button {...props} /> // eslint-disable-line react/display-name
