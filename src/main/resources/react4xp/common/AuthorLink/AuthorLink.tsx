import {type FC} from 'react';

import { Image } from '/react4xp/common/Image/Image';
import type { ImageData } from '/react4xp/common/types';

interface AuthorLinkProps {
  url?: string;
  image?: ImageData;
  author?: string;
}

export const AuthorLink: FC<AuthorLinkProps> = ({
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
