import React from 'react';

import Image from './Image';

export const AuthorLink = ({
  url,
  image,
  author,
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
);

export default (props) => <AuthorLink {...props} />;