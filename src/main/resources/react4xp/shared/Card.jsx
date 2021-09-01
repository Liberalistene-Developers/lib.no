import React from 'react'
import PropTypes from 'prop-types'

/**
 * Primary Image holder for solution.
 */
export const Card = ({
  children,
  image,
  noIngress = false,
  title,
  text,
  url = ''
}) => {
  return (
    <div className="card-holder">
      { image && (
        <div className="card-image-holder">
          <a href={url} title={title}>
            <img src={image.url} alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop())} className="card-image" />
          </a>
          {children}
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">
          <a href={url} title={title}>{title}</a>
        </h3>
        { !noIngress && text && (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: text }} />
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.arrayOf(React.Element),
  image: PropTypes.shape({
    url: PropTypes.string,
    displayName: PropTypes.string,
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
