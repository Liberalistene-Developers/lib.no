import React from 'react'
import PropTypes from 'prop-types'

export const TextBlock = ({
  text = '',
  title = '',
  titleColor = ''
}) => (
  <>
    { (title || text) && (
      <div className="text-block">
        { title && (
          <div className={ `text-block-title ${titleColor}`}>
            <h2>{ title }</h2>
          </div>
        )}
        { text && (
          <div className="text-block-text">
            <div className="page-content rich-text" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        )}
      </div>
    )}
  </>
)

TextBlock.propTypes = {
  /** Plain or html formated text */
  text: PropTypes.string,

  /** H2 title */
  title: PropTypes.string,

  /** class to set color on title */
  titleColor: PropTypes.string
}

TextBlock.defaultProps = {
  text: '',
  title: '',
  titleCenter: ''
}

export default (props) => <TextBlock {...props} /> // eslint-disable-line react/display-name
