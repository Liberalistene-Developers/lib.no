import {type FC} from 'react';

import { Image } from '/react4xp/common/Image/Image';
import type { ImageData } from '/react4xp/common/types';

/**
 * Props for the AuthorLink component.
 */
interface AuthorLinkProps {
  /** URL to the author's profile or page */
  url?: string;
  /** Author's profile image data */
  image?: ImageData;
  /** Author's display name */
  author?: string;
}

/**
 * AuthorLink component for displaying an author's profile link with image and name.
 *
 * Renders a list item containing a linked author profile with:
 * - Small circular profile image
 * - Author's name
 *
 * Commonly used in article bylines and book author listings.
 *
 * @example
 * ```tsx
 * <AuthorLink
 *   url="/authors/john-doe"
 *   image={{url: '/images/authors/john.jpg', displayName: 'John Doe'}}
 *   author="John Doe"
 * />
 * ```
 *
 * @remarks
 * - Always renders as a `<li>` element, so must be used within a `<ul>` or `<ol>`
 * - Image uses "extra-small" and "round" CSS classes for styling
 * - The entire container (image + name) is wrapped in a single anchor link
 */
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
