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
  noIngress = false,
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
        { !noIngress && (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: text}} />
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.arrayOf(React.Element),
  image: PropTypes.shape({
    url: PropTypes.string,
    alternativeText: PropTypes.string
  }),
  noIngress: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
}

Card.defaultProps = {
  image: null,
  noIngress: false,
  text: '',
  title: '',
  url: ''
}

export default (props) => <Card {...props} /> // eslint-disable-line react/display-name
