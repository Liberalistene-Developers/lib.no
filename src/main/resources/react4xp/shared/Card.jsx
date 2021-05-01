import React from 'react'
import PropTypes from 'prop-types'

/**
 * Primary Image holder for solution.
 */
export const Card = ({
  children,
  image,
  title,
  text,
  url = ''
}) => {
  return (
    <div className="card-holder">
      { image && (
        <div>
          <img src={image.url} alt={image.alternativeText} className="card-image" />
          {children}
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">
          <a href={url} title={title}>{title}</a>
        </h3>
        <div className="rich-text">
          {text}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alternativeText: PropTypes.string
  }),
  children: PropTypes.arrayOf(React.Element),
  url: PropTypes.string
}

Card.defaultProps = {
  image: null,
  text: '',
  title: '',
  url: ''
}

export default (props) => <Card {...props} /> // eslint-disable-line react/display-name
