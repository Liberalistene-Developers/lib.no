import React from 'react'
import PropTypes from 'prop-types'

import Image from '../../../react4xp/shared/Image.jsx'

export const Person = ({
  title,
  image,
  description,
  shortDescription,
  email,
  emailPrefix,
  tags
}) => (
  <div className="person-wrapper">
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    { shortDescription && (
      <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    )}

    { description && (
      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
    )}

    { email && (
      <div className="contact-information">
        <a className="email" href={`mailto:${email}`}>{emailPrefix ? [emailPrefix, title].join(' ') : title}</a>
      </div>
    )}
  </div>
)

Person.propTypes = {
  email: PropTypes.string,
  emailPrefix: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  tags: PropTypes.array
}

export default (props) => <Person {...props} /> // eslint-disable-line react/display-name
