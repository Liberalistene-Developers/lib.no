import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'

export const AuthorLink = ({
  url,
  image,
  author
}) => (
  <li>
    <div>
      <a href={url}>
        <Image
          image={image}
          className="extra-small"
          imageClassName="round"
        />
        <span>
          {author}
        </span>
      </a>
    </div>
  </li>
)

AuthorLink.propTypes = {
  url: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  author: PropTypes.string
}

const DefaultAuthorLink = (props) => <AuthorLink {...props} />
DefaultAuthorLink.displayName = 'AuthorLink'

export default DefaultAuthorLink
