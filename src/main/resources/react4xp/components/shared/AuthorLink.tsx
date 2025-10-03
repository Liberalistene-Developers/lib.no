import * as React from 'react';
import { Image } from './Image';

interface ImageData {
  url?: string;
}

interface AuthorLinkProps {
  url?: string;
  image?: ImageData;
  author?: string;
}

export const AuthorLink: React.FC<AuthorLinkProps> = ({
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
);
