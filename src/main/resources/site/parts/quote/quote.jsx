import React from 'react'
import PropTypes from 'prop-types'

import Image from '../../../react4xp/shared/Image.jsx'

export const Quote = ({
  title,
  image,
  authors,
  quote,
  description,
  tags
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    { authors && authors.length > 0 && (
      <ul>
        { authors.map(({ authorID, person, personUrl, image }) => (
          <li key={authorID}>
            <div>
              <a href={personUrl}>
                { image && (
                  <img src={image} alt={person} />
                )}
                <span>
                  {person}
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    )}
    { quote && (
      <div dangerouslySetInnerHTML={{ __html: quote }} />
    )}
    { description && (
      <div dangerouslySetInnerHTML={{ __html: quote || description }} />
    )}
  </div>
)

Quote.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  authors: PropTypes.arrayOf({
    name: PropTypes.string
  }),
  quote: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array
}

Quote.defaultProps = {
  title: '',
  image: undefined,
  authors: [],
  quote: '',
  description: '',
  tags: []
}

export default (props) => <Quote {...props} /> // eslint-disable-line react/display-name
