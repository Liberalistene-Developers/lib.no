import React from 'react'
import PropTypes from 'prop-types'

import Image from '../../../react4xp/shared/Image.jsx'

export const Person = ({
  title,
  image,
  description,
  shortDescription,
  tags
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    { shortDescription && (
      <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    )}

    { description && (
      <div dangerouslySetInnerHTML={{ __html: description }} />
    )}
  </div>
)

Person.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  tags: PropTypes.array
}

const DefaultPerson = (props) => <Person {...props} />
DefaultPerson.displayName = 'Person'

export default DefaultPerson
