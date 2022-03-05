import PropTypes from 'prop-types'

import cx from 'classnames'

export const LibInput = ({
  defaultValue,
  disabled,
  label,
  name,
  underlined,
  required,
  filled,
  type,
  helperText,
  value
}) => (
  <div className={cx('lib-input-group')} disabled={disabled} role="input">
    <label className={cx({ 'lib-input-underlined': underlined, 'lib-input-filled': filled })} title={label}>
      <input type={type} name={name} placeholder={label} required={required} disabled={disabled} className="lib-input-group-input" value={value} defaultValue={defaultValue} />
      <span className="lib-input-label">{label}</span>
      { helperText && (
        <span className="lib-input-helper">{helperText}</span>
      )}
    </label>
  </div>
)

LibInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  underlined: PropTypes.bool,
  filled: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string
}

LibInput.defaultProps = {
  disabled: false,
  required: false,
  helperText: '',
  type: 'text',
  underlined: true,
  filled: false
}

export default (props) => <LibInput {...props} /> // eslint-disable-line react/display-name
