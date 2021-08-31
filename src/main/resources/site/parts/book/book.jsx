import React from 'react'
import PropTypes from 'prop-types'

import Image from '../../../react4xp/shared/Image.jsx'

export const Book = ({
  title,
  image,
  authors,
  ingress,
  text,
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
    <div dangerouslySetInnerHTML={{ __html: ingress }} />
    <div dangerouslySetInnerHTML={{ __html: text || description }} />
  </div>
)

Book.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  authors: PropTypes.arrayOf({
    name: PropTypes.string
  }),
  ingress: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  tags: PropTypes.array
}

export default (props) => <Book {...props} /> // eslint-disable-line react/display-name
