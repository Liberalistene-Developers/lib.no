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
  <a
    href={url}
    target={target}
    className={cx('button', 'paper-raise', className)}
    onClick={onClick}
  >
    {title}
  </a>
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

const DefaultButton = (props) => <Button {...props} />
DefaultButton.displayName = 'Button'

export default DefaultButton
