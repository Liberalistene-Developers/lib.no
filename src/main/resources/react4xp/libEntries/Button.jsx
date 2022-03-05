
import PropTypes from 'prop-types'

import cx from 'classnames'

export const Button = ({
  disabled,
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
      className={cx('button', 'paper-raise', className, { disabled })}
      onClick={onClick}
      rel="noreferrer"
      role="button"
    >
      {title}
    </a>
  </div>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  target: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  disabled: false,
  target: undefined
}

export default (props) => <Button {...props} /> // eslint-disable-line react/display-name
